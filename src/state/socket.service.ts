import { AnyAction } from '@reduxjs/toolkit';
import { ChatMessage, Room, Player, UserError } from '../interfaces';
import {
  connectRoom,
  listRoomsReply,
  chatMessageReceived,
  joinRoomReply,
  onError,
  profileReceived,
  updateRoom,
} from './actions';
import { ParasztactivityHandler, parasztactivityHandlerFactory } from './parasztactivity/parasztactivity.handler';

export type SocketHandler = {
  socket: SocketIOClient.Socket;
  listRooms: () => void;
  createRoom: (payload: { roomName: string }) => void;
  joinRoom: (payload: { name: string; roomName: string }) => void;
  leaveRoom: (payload: { roomName: string }) => void;
  setProfile: (payload: { name: string }) => void;
  getProfile: () => void;
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
    dispatch(profileReceived(response));
  });

  socket.on('updateRoom', (response: { room: Room }) => {
    console.log('update room', response.room);
    dispatch(updateRoom(response));
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
    leaveRoom: (payload: { roomName: string }) => {
      socket.emit('leaveRoom', { roomName: payload.roomName });
    },

    createRoom: (payload: { roomName: string }) => {
      socket.emit('createRoom', payload.roomName);
    },

    setProfile: (payload: { name: string }) => {
      socket.emit('setProfile', { name: payload.name });
    },

    getProfile: () => {
      socket.emit('getProfile');
    },

    sendChatMessage: (payload) => {
      socket.emit('chatMessage', payload);
    },

    listRooms: () => {
      socket.emit('listRooms');
    },
  };
};
