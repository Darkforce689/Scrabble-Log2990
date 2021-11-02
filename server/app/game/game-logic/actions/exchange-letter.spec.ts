import { GameActionNotifierService } from '@app/game/game-action-notifier/game-action-notifier.service';
import { ExchangeLetter } from '@app/game/game-logic/actions/exchange-letter';
import { Letter } from '@app/game/game-logic/board/letter.interface';
import { DEFAULT_TIME_PER_TURN } from '@app/game/game-logic/constants';
import { ServerGame } from '@app/game/game-logic/game/server-game';
import { GameStateToken } from '@app/game/game-logic/interface/game-state.interface';
import { Player } from '@app/game/game-logic/player/player';
import { PointCalculatorService } from '@app/game/game-logic/point-calculator/point-calculator.service';
import { TimerController } from '@app/game/game-logic/timer/timer-controller.service';
import { SystemMessagesService } from '@app/messages-service/system-messages.service';
import { GameCompiler } from '@app/services/game-compiler.service';
import { expect } from 'chai';
import { Subject } from 'rxjs';

describe('ExchangeLetter', () => {
    let game: ServerGame;
    const player1: Player = new Player('Tim');
    const player2: Player = new Player('George');
    const randomBonus = false;
    let activePlayer: Player;
    const pointCalculator = new PointCalculatorService();
    const gameCompiler = new GameCompiler();
    const mockNewGameState$ = new Subject<GameStateToken>();
    const messagesService = new SystemMessagesService(new GameActionNotifierService());

    beforeEach(() => {
        game = new ServerGame(
            new TimerController(),
            randomBonus,
            DEFAULT_TIME_PER_TURN,
            'default_gameToken',
            pointCalculator,
            gameCompiler,
            messagesService,
            mockNewGameState$,
        );
        game.players.push(player1);
        game.players.push(player2);
        game.start();
        activePlayer = game.getActivePlayer();
    });

    it('letter rack should be different when exchanging letters', () => {
        const initialLetterRack: Letter[] = [...activePlayer.letterRack];
        const lettersToExchange: Letter[] = initialLetterRack.slice(0, 3);
        const exchangeAction = new ExchangeLetter(activePlayer, lettersToExchange);

        exchangeAction.execute(game);

        const finalLetterRack: Letter[] = activePlayer.letterRack;
        initialLetterRack.sort((a, b) => a.char.charCodeAt(0) - b.char.charCodeAt(0));
        finalLetterRack.sort((a, b) => a.char.charCodeAt(0) - b.char.charCodeAt(0));

        expect(initialLetterRack).not.to.deep.equal(finalLetterRack);
    });
});
