import { Injectable } from '@angular/core';
import { GameState } from '@app/GameLogic/game/game-state';
import { UserAuth } from '@app/modeMulti/interface/user-auth.interface';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

export interface OnlineAction {
    type: OnlineActionType;
    args?: string[];
}

export enum OnlineActionType {
    Place = 'place',
    Exchange = 'exchange',
    Pass = 'pass',
}

export interface GameAuth {
    playerName: string;
    gameToken: string;
}

const HAVE_NOT_JOINED_GAME_ERROR = 'You havent join a game';
const SERVER_OFFLINE_ERROR = 'The game server is offline';
const GAME_ALREADY_JOINED = 'You have already joined a game';

@Injectable({
    providedIn: 'root',
})
export class GameSocketHandlerService {
    private socket: Socket | undefined;
    private gameStateSubject = new Subject<GameState>();
    private endTurnSubject = new Subject<void>();
    get gameState$(): Observable<GameState> {
        return this.gameStateSubject;
    }

    get endTurn$(): Observable<void> {
        return this.endTurnSubject;
    }

    joinGame(userAuth: UserAuth) {
        if (this.socket) {
            throw Error(GAME_ALREADY_JOINED);
        }
        this.socket = io(environment.serverSocketUrl, { path: '/game' });
        this.socket.emit('joinGame', userAuth);
        this.socket.on('gameState', this.receiveGameState);
    }

    playAction(action: OnlineAction) {
        if (!this.socket) {
            throw Error(HAVE_NOT_JOINED_GAME_ERROR);
        }

        if (this.socket.disconnected) {
            throw Error(SERVER_OFFLINE_ERROR);
        }
        this.socket.emit('nextAction', action);
    }

    forfeit() {
        if (!this.socket) {
            throw Error(HAVE_NOT_JOINED_GAME_ERROR);
        }
        this.socket?.disconnect();
    }

    private receiveGameState(gameState: unknown) {
        console.log('game state received', gameState);
        return gameState;
    }
}
