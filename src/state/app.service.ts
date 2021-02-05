import { AnyAction } from '@reduxjs/toolkit';
import { Room } from '../interfaces';
import { connectRoom, joinRoom, createRoom, listRoomsReply } from './actions';

export type SocketHandler = {
  listRooms: () => void;
  createRoom: (payload: { roomName: string }) => void;
  joinRoom: (payload: { name: string; roomId: string }) => void;
};

export const socketHandlerFactory = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
): SocketHandler => {
  socket.on('connect', (response: unknown) => {
    console.log('Connected! ', response);
    dispatch(connectRoom());
  });

  socket.on('nudge', (response: unknown) => {
    console.log('nudged', response);
  });

  socket.on('listRoomsReply', (response: Room[]) => {
    dispatch(listRoomsReply({ rooms: response }));
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

    listRooms: () => {
      console.log('sending listRooms');
      socket.emit('listRooms');
    },
  };
};
