import { AnyAction } from 'redux';
import { AddWordPayload, ParasztactivityEvent } from './parasztactivity.interfaces';
import { ParasztactivityActions } from './parasztactivity.actions';
import { Room } from '../../interfaces';

export type ParasztactivityHandler = ReturnType<typeof parasztactivityHandlerFactory>;

export const parasztactivityHandlerFactory = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
  roomId: number | undefined,
) => {
  socket.on('gameState', (payload: { gameState: any }) => {
    dispatch(ParasztactivityActions.gameState(payload.gameState));
  });

  socket.on('createRoomReply', () => {
    init();
  });

  socket.on('joinChannelReply', () => {
    getState();
  });

  const getState = () => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('getGameState', { game: 'parasztactivity', roomId });
  };

  const init = () => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('initGame', { game: 'parasztactivity', roomId });
  };

  const addWord = (word: string) => {
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
