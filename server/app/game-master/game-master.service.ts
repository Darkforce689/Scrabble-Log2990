import { OnlineGameSettings } from '@app/game-manager/game-settings-multi.interface';
import { Service } from 'typedi';

@Service()
export class GameMaster {
    createGame(gameToken: string, gameSettings: OnlineGameSettings) {
        console.log('GameToken: ', gameToken);
        console.log('GameSettting: ', gameSettings);
        // Creer object GAME
    }
}
