import { AnyAction } from 'redux';
import { AddWordPayload, ParasztactivityEvent, PublicGameState } from './parasztactivity.interfaces';
import { ParasztactivityActions } from './parasztactivity.actions';
import { EventHandlerFactory } from '../../socketio/namespacehandler';
import { Dispatch } from 'react';

export type ParasztactivityHandler = {
  getState: (roomId: number) => void;
  init: (roomId: number) => void;
  addWord: (word: string, roomId: number) => void;
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

  return {
    getState,
    init,
    addWord,
  };
};
