import { AnyAction } from 'redux';
import {
  AddWordPayload,
  ParasztactivityEvent,
  PublicGameState,
  StartGamePayload,
  StartRoundPayload,
  StartTurnPayload,
} from '../state/parasztactivity/parasztactivity.interfaces';
import { ParasztactivityActions } from '../state/parasztactivity/parasztactivity.actions';
import { EventHandlerFactory } from './namespacehandler';
import { Dispatch } from 'react';

export type ParasztactivityHandler = {
  getState: (roomId: number) => void;
  init: (roomId: number) => void;
  addWord: (word: string, roomId: number) => void;
  startTurn: (roomId: number) => void;
  startRound: (roomId: number) => void;
  startGame: (roomId: number) => void;
};

export const registerParasztactivityHandler = (dispatch: Dispatch<AnyAction>): EventHandlerFactory => (
  socket: SocketIOClient.Socket,
): void => {
  socket.on('gameState', (payload: { gameState: PublicGameState }) => {
    console.log('received gameState', payload);
    dispatch(ParasztactivityActions.gameState(payload.gameState));
  });
};

export const parasztactivityHandlerFactory = (socket: SocketIOClient.Socket): ParasztactivityHandler => {
  const getState = (roomId: number): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('getGameState', { game: 'parasztactivity', roomId });
  };

  const init = (roomId: number): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('initGame', { game: 'parasztactivity', roomId });
  };

  const addWord = (word: string, roomId: number): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }

    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'addWord',
        roomId,
        payload: {
          word,
          playerId: socket.id,
        } as AddWordPayload,
      } as ParasztactivityEvent,
    });
  };

  const startGame = (roomId: number): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startGame',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };
  const startRound = (roomId: number): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startRound',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };
  const startTurn = (roomId: number): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startTurn',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };

  return {
    getState,
    init,
    addWord,
    startTurn,
    startRound,
    startGame,
  };
};
