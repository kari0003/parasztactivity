import { AnyAction } from '@reduxjs/toolkit';
import { ChatMessage, Room } from '../interfaces';
import { connectRoom, joinRoom, createRoom, listRoomsReply, chatMessageReceived } from './actions';

export type SocketHandler = {
  listRooms: () => void;
  createRoom: (payload: { roomName: string }) => void;
  joinRoom: (payload: { name: string; roomId: string }) => void;
  sendChatMessage: (payload: ChatMessage) => void;
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

  socket.on('chatMessage', (chatMessage: ChatMessage) => {
    console.log('message received', chatMessage);
    dispatch(chatMessageReceived(chatMessage));
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

    sendChatMessage: (payload: ChatMessage) => {
      console.log('sending chat message lol');
      socket.emit('chatMessage', payload);
    },

    listRooms: () => {
      console.log('sending listRooms');
      socket.emit('listRooms');
    },
  };
};
