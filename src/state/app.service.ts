import { AnyAction } from '@reduxjs/toolkit';
import { ChatMessage, Room, Player, UserError } from '../interfaces';
import {
  connectRoom,
  joinRoom,
  createRoom,
  listRoomsReply,
  chatMessageReceived,
  joinRoomReply,
  onError,
} from './actions';

export type SocketHandler = {
  socket: SocketIOClient.Socket;
  listRooms: () => void;
  createRoom: (payload: { roomName: string }) => void;
  joinRoom: (payload: { name: string; roomName: string }) => void;
  sendChatMessage: (payload: { roomName: string; chatMessage: ChatMessage }) => void;
};

export const socketHandlerFactory = (
  socket: SocketIOClient.Socket,
  dispatch: React.Dispatch<AnyAction>,
): SocketHandler => {
  socket.on('connect', (response: unknown) => {
    console.log('Connected! ', response);
    dispatch(connectRoom());
  });

  socket.on('error', (response: UserError) => {
    dispatch(onError(response));
  });

  socket.on('joinChannelReply', (response: { room: Room }) => {
    dispatch(joinRoomReply(response));
  });

  socket.on('listRoomsReply', (response: Room[]) => {
    dispatch(listRoomsReply({ rooms: response }));
  });

  socket.on('profileReply', (response: Player) => {
    // TODO
  });

  socket.on('chatMessageOut', (chatMessage: ChatMessage) => {
    console.log('message received', chatMessage, socket.id);
    dispatch(chatMessageReceived(chatMessage));
  });

  return {
    socket,
    joinRoom: (payload: { name: string; roomName: string }) => {
      socket.emit('joinRoom', payload);
    },

    createRoom: (payload: { roomName: string }) => {
      dispatch(createRoom(payload));

      socket.emit('createRoom', payload.roomName);
    },

    sendChatMessage: (payload) => {
      console.log('sending chat message lol');
      socket.emit('chatMessage', payload);
    },

    listRooms: () => {
      console.log('sending listRooms');
      socket.emit('listRooms');
    },
  };
};
