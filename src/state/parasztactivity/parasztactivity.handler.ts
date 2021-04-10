import { AnyAction } from 'redux';
import { AddWordPayload, ParasztactivityEvent, PublicGameState } from './parasztactivity.interfaces';
import { ParasztactivityActions } from './parasztactivity.actions';
import { useSocket } from '../socket';
import React, { useState } from 'react';

export type ParasztactivityHandler = {
  getState: () => void;
  init: () => void;
  addWord: (word: string) => void;
};

export const registerParasztactivityHandler = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
): void => {
  socket.on('gameState', (payload: { gameState: PublicGameState }) => {
    dispatch(ParasztactivityActions.gameState(payload.gameState));
  });
};

export const parasztactivityHandlerFactory = (
  socket: SocketIOClient.Socket,
  roomId: number | undefined,
): ParasztactivityHandler => {
  const getState = (): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('getGameState', { game: 'parasztactivity', roomId });
  };

  const init = (): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('initGame', { game: 'parasztactivity', roomId });
  };

  const addWord = (word: string): void => {
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

export const useSingletonParasztactivityHandler = (roomId: number | undefined): ParasztactivityHandler => {
  const [handlers, setHandlers] = useState<Record<number, ParasztactivityHandler>>({});
  if (roomId === undefined) {
    throw new Error('roomId cannot be undefined');
  }
  const socket = useSocket();
  if (socket === undefined) {
    throw new Error('socket cannot be undefined');
  }
  if (!handlers[roomId]) {
    const newHandler = parasztactivityHandlerFactory(socket, roomId);
    setHandlers({ ...handlers, [roomId]: newHandler });

    return newHandler;
  }
  return handlers[roomId];
};
