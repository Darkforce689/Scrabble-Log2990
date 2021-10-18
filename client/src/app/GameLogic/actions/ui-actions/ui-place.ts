import { Action } from '@app/GameLogic/actions/action';
import { Direction } from '@app/GameLogic/actions/direction.enum';
import { PlaceLetter } from '@app/GameLogic/actions/place-letter';
import { UIAction } from '@app/GameLogic/actions/ui-actions/ui-action';
import { LetterPlacement } from '@app/GameLogic/actions/ui-actions/ui-place-interface';
import { BACKSPACE, BOARD_MAX_POSITION, BOARD_MIN_POSITION, EMPTY_CHAR, JOKER_CHAR } from '@app/GameLogic/constants';
import { BoardService } from '@app/GameLogic/game/board/board.service';
import { Player } from '@app/GameLogic/player/player';
import { PointCalculatorService } from '@app/GameLogic/point-calculator/point-calculator.service';
import { isStringALowerCaseLetter, isStringAnUpperCaseLetter } from '@app/GameLogic/utils';
import { DictionaryService } from '@app/GameLogic/validator/dictionary.service';
import { WordSearcher } from '@app/GameLogic/validator/word-search/word-searcher.service';

export class UIPlace implements UIAction {
    concernedIndexes = new Set<number>();
    orderedIndexes: LetterPlacement[] = [];
    direction = Direction.Horizontal;
    pointerPosition: { x: number; y: number } | null = null;

    // TODO : NEXT LINE MUST BE A CONSTRUCTOR ATTRIBUTE
    board = new BoardService();

    constructor(private player: Player) {}

    get canBeCreated(): boolean {
        throw new Error('Method not implemented.');
    }

    receiveRightClick(): void {
        throw new Error('UIPlace should not be able to receive a RightClick');
    }

    receiveLeftClick(args: unknown): void {
        const clickPosition = args as { x: number; y: number };
        if (this.isPlacementInProgress()) {
            return;
        }
        if (this.canPlaceALetterHere(clickPosition.x, clickPosition.y)) {
            if (clickPosition === this.pointerPosition) {
                this.toggleDirection();
                return;
            }
            this.pointerPosition = clickPosition;
        }
    }

    receiveKey(key: string): void {
        switch (key) {
            case BACKSPACE:
                this.moveBackwards();
                break;
            default:
                if (this.canUseLetter(key)) {
                    this.useLetter(key);
                }
                this.moveForwards();
                break;
        }
    }

    receiveRoll(): void {
        throw new Error('UIExchange should not be able to receive a MouseRoll');
    }

    create(): Action {
        return new PlaceLetter(
            this.player,
            '',
            { direction: this.direction, x: 0, y: 0 },
            new PointCalculatorService(new BoardService()),
            new WordSearcher(new BoardService(), new DictionaryService()),
        );
    }

    private useLetter(key: string) {
        if (!this.pointerPosition) {
            return;
        }
        // TODO : FIND LETTER IN RACK
        const rackIndex = 1;
        const newLetterPlacement: LetterPlacement = { x: this.pointerPosition.x, y: this.pointerPosition.y, rackIndex };
        this.concernedIndexes.add(rackIndex);
        this.orderedIndexes.push(newLetterPlacement);
        // TODO : ADD LETTER VIUSALLY ON BOARD
        throw new Error('Method not implemented.');
    }

    private moveForwards(): boolean {
        if (!this.pointerPosition) {
            return false;
        }

        let deltaX = 0;
        let deltaY = 0;
        if (this.direction === Direction.Horizontal) {
            deltaX = 1;
        } else {
            deltaY = 1;
        }

        let x = this.pointerPosition.x;
        let y = this.pointerPosition.y;
        do {
            x += deltaX;
            y += deltaY;
        } while (!this.canPlaceALetterHere(x, y));

        if (!this.isInsideOfBoard(x, y)) {
            this.pointerPosition = null;
            return false;
        }

        this.pointerPosition = { x, y };
        return true;
    }

    private canUseLetter(key: string): boolean {
        let letterToUse = key;
        if (isStringAnUpperCaseLetter(key)) {
            letterToUse = JOKER_CHAR;
        }
        if (isStringALowerCaseLetter(key) || key === JOKER_CHAR) {
            for (let i = 0; i < this.player.letterRack.length; i++) {
                const rackLetter = this.player.letterRack[i];
                if (rackLetter.char === letterToUse && !this.concernedIndexes.has(i)) {
                    return true;
                }
            }
        }
        return false;
    }

    private canPlaceALetterHere(x: number, y: number): boolean {
        if (this.isInsideOfBoard(x, y)) {
            return this.board.board.grid[y][x].letterObject.char === EMPTY_CHAR;
        }
        return false;
    }

    private isInsideOfBoard(x: number, y: number) {
        return x >= BOARD_MIN_POSITION && x <= BOARD_MAX_POSITION && y >= BOARD_MIN_POSITION && y <= BOARD_MAX_POSITION;
    }

    private moveBackwards(): boolean {
        const lastLetter = this.orderedIndexes.pop();
        if (lastLetter !== undefined) {
            this.concernedIndexes.delete(lastLetter.rackIndex);
            this.pointerPosition = { x: lastLetter.x, y: lastLetter.y };
            return true;
        }
        return false;
    }

    private isPlacementInProgress(): boolean {
        return this.concernedIndexes.size > 0;
    }

    private toggleDirection(): void {
        if (!this.isPlacementInProgress()) {
            this.direction = this.direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
        }
    }
}
