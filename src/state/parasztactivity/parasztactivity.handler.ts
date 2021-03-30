import { AnyAction } from 'redux';
import { GameEvent } from '../../interfaces';
import { AddWordPayload, EventTypes, ParasztactivityEvent } from './parasztactivity.interfaces';

export type ParasztactivityHandler = {
  addWord: (word: string) => void;
};

export const parasztactivityHandlerFactory = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
): ParasztactivityHandler => {
  return {
    addWord: (word: string) => {
      socket.emit('gameEvent', {
        gameEvent: {
          game: 'parasztactivity',
          eventType: 'addWord',
          roomId: 0,
          payload: {
            word,
            playerId: socket.id,
          } as AddWordPayload,
        } as ParasztactivityEvent,
      });
    },
  };
};
