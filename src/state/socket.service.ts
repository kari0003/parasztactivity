import { AnyAction } from '@reduxjs/toolkit';
import { ChatMessage, Room, Player, UserError } from '../interfaces';
import {
  listRoomsReply,
  chatMessageReceived,
  joinRoomReply,
  onError,
  profileReceived,
  updateRoom,
  connect,
  disconnect,
  handshakeReply,
} from './actions';
import { useApp } from './app.context';
import { useSocket } from './socket';

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

export const registerHandler = (socket: SocketIOClient.Socket, dispatch: React.Dispatch<AnyAction>): void => {
  socket.on('connect', () => {
    console.log('Connected!');
    dispatch(connect());
  });

  socket.on('disconnect', () => {
    console.log('disconnected!', socket.id);
    dispatch(disconnect());
  });

  socket.on('error', (response: UserError) => {
    dispatch(onError(response));
  });

  socket.on('handshakeReply', (response: { token: string }) => {
    console.log('handshakeReply!', response);
    sessionStorage.setItem('token', response.token);
    dispatch(handshakeReply(response));
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
};

export const useLobbyEmitter = (): SocketHandler => {
  const socket = useSocket();
  const { state } = useApp();
  return {
    socket,
    joinRoom: (payload: { name: string; roomName: string }) => {
      socket.emit('joinRoom', { ...payload, token: state.token });
    },
    leaveRoom: (payload: { roomName: string }) => {
      socket.emit('leaveRoom', { roomName: payload.roomName, token: state.token });
    },

    createRoom: (payload: { roomName: string }) => {
      socket.emit('createRoom', { roomName: payload.roomName, token: state.token });
    },

    setProfile: (payload: { name: string }) => {
      socket.emit('setProfile', { name: payload.name, token: state.token });
    },

    getProfile: () => {
      socket.emit('getProfile', { token: state.token });
    },

    sendChatMessage: (payload) => {
      socket.emit('chatMessage', { ...payload, token: state.token });
    },

    listRooms: () => {
      socket.emit('listRooms', { token: state.token });
    },
  };
};
