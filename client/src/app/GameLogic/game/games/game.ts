/* eslint-disable no-restricted-imports */
import { Action } from '@app/GameLogic/actions/action';
import { PassTurn } from '@app/GameLogic/actions/pass-turn';
import { Player } from '@app/GameLogic/player/player';
import { PointCalculatorService } from '@app/GameLogic/point-calculator/point-calculator.service';
import { merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { LetterBag } from '../letter-bag';
import { TimerService } from '../timer/timer.service';

const MAX_CONSECUTIVE_PASS = 6;

export class Game {
    static readonly maxConsecutivePass = MAX_CONSECUTIVE_PASS;
    letterBag: LetterBag = new LetterBag();
    players: Player[] = [];
    activePlayerIndex: number;
    consecutivePass: number = 0;
    isEnded: boolean = false;

    constructor(public timePerTurn: number, private timer: TimerService, private pointCalculator: PointCalculatorService) {}

    start(): void {
        this.drawGameLetters();
        this.pickFirstPlayer();
        this.startTurn();
    }

    private pickFirstPlayer() {
        const max = this.players.length;
        const firstPlayer = Math.floor(Math.random() * max);
        this.activePlayerIndex = firstPlayer;
    }

    private drawGameLetters() {
        for (const player of this.players) {
            player.letterRack = this.letterBag.drawEmptyRackLetters();
            player.displayGameLetters();
            this.letterBag.displayNumberGameLettersLeft();
        }
    }

    private startTurn() {
        // TODO timerends emits passturn action + feed action in end turn arguments
        const activePlayer = this.players[this.activePlayerIndex];
        console.log('its', activePlayer, 'turns');
        const timerEnd$ = this.timer.start(this.timePerTurn).pipe(mapTo(new PassTurn(activePlayer)));
        const turnEnds$ = merge(activePlayer.action$, timerEnd$);
        turnEnds$.subscribe((action) => this.endOfTurn(action));
    }
    // TODO implement action execute
    private endOfTurn(action: Action) {
        action.execute(this);
        console.log('end of turn');
        if (this.isEndOfGame()) {
            this.onEndOfGame();
            return;
        }
        this.nextPlayer();
        this.startTurn();
    }

    nextPlayer() {
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    }
    getActivePlayer(): Player {
        return this.players[this.activePlayerIndex];
    }

    isEndOfGame() {
        if (this.letterBag.isEmpty) {
            for (const player of this.players) {
                if (player.letterRackIsEmpty) {
                    return true;
                }
            }
        }
        if (this.consecutivePass >= Game.maxConsecutivePass) {
            return true;
        }
        return false;
    }

    onEndOfGame() {
        this.pointCalculator.endOfGamePointdeduction(this);

        // Afficher le gagnant ou les deux si egale
        // Afficher les lettres restantes
        // Enregistrer dans meilleurs scores
    }

    doAction(action: Action) {
        if (action instanceof PassTurn) {
            this.consecutivePass += 1;
        } else {
            this.consecutivePass = 0;
        }
    }
}
