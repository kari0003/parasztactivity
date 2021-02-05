import { AnyAction } from '@reduxjs/toolkit';
import { connectRoom, joinRoom, createRoom } from './actions';

export const socketHandlerFactory = (socket: SocketIOClient.Socket, dispatch: React.Dispatch<AnyAction>) => {
  socket.on('connect', (response: unknown) => {
    console.log('response', response);
    dispatch(connectRoom());
  });

  socket.on('nudge', (response: unknown) => {
    console.log('nudged', response);
  });

  return {
    joinRoom: (payload: { name: string; roomId: string }) => {
      dispatch(joinRoom(payload));

      socket.emit('joinRoom', payload);
    },

    createRoom: (payload: { roomName: string }) => {
      dispatch(createRoom(payload));

      socket.emit('createRoom', payload.roomName);
    },
  };
};
