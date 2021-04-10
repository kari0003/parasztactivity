import { AnyAction } from 'redux';
import { AddWordPayload, ParasztactivityEvent, PublicGameState } from './parasztactivity.interfaces';
import { ParasztactivityActions } from './parasztactivity.actions';
import { useApp } from '../app.context';
import { useSocketSingleton } from '../socket';
import { useState } from 'react';

export type ParasztactivityHandler = {
  getState: () => void;
  init: () => void;
  addWord: (word: string) => void;
};

export const parasztactivityHandlerFactory = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
  roomId: number | undefined,
): ParasztactivityHandler => {
  socket.on('gameState', (payload: { gameState: PublicGameState }) => {
    dispatch(ParasztactivityActions.gameState(payload.gameState));
  });

  socket.on('createRoomReply', () => {
    init();
  });

  socket.on('joinChannelReply', () => {
    getState();
  });

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
  const { dispatch } = useApp();
  const socket = useSocketSingleton();
  if (!handlers[roomId]) {
    const newHandler = parasztactivityHandlerFactory(socket, dispatch, roomId);
    setHandlers({ ...handlers, [roomId]: newHandler });

    return newHandler;
  }
  return handlers[roomId];
};
