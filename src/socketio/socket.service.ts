import { AnyAction } from '@reduxjs/toolkit';
import { ChatMessage, Room, Player, UserError } from '../interfaces';
import { EventHandlerFactory } from './namespacehandler';
import {
  listRoomsReply,
  chatMessageReceived,
  joinRoomReply,
  onError,
  profileReceived,
  updateRoom,
  connect,
  disconnect,
} from '../state/actions';
import { useApp } from '../state/app.context';
import { parasztactivityHandlerFactory } from './parasztactivity.handler';
import { useSocket } from '../state/socket';

export type LobbyEmitter = {
  socket: SocketIOClient.Socket;
  listRooms: () => void;
  createRoom: (payload: { roomName: string }) => void;
  joinRoom: (payload: { name: string; roomName: string }) => void;
  leaveRoom: (payload: { roomName: string }) => void;
  setProfile: (payload: { name: string }) => void;
  getProfile: () => void;
  sendChatMessage: (payload: { roomName: string; chatMessage: ChatMessage }) => void;
};

export const registerHandlerFactory = (dispatch: React.Dispatch<AnyAction>): EventHandlerFactory => (
  socket: SocketIOClient.Socket,
): void => {
  socket.on('error', (response: UserError) => {
    dispatch(onError(response));
  });

  socket.on('joinChannelReply', (response: { room: Room }) => {
    console.log('joined', response);
    parasztactivityHandlerFactory(socket).getState(response.room.id);
    dispatch(joinRoomReply(response));
  });

  socket.on('createRoomReply', (response: { room: Room }) => {
    console.log('created', response);
    parasztactivityHandlerFactory(socket).init(response.room.id);
  });

  socket.on('listRoomsReply', (response: Room[]) => {
    dispatch(listRoomsReply({ rooms: response }));
  });

  socket.on('profileReply', (response: Player) => {
    localStorage.setItem('name', response.name);
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

export const lobbyEmitterFactory = (socket: SocketIOClient.Socket, token: string | null): LobbyEmitter => {
  return {
    socket,
    joinRoom: (payload: { name: string; roomName: string }) => {
      console.log('join room', payload);
      socket.emit('joinRoom', { ...payload, token: token });
    },
    leaveRoom: (payload: { roomName: string }) => {
      socket.emit('leaveRoom', { roomName: payload.roomName, token: token });
    },

    createRoom: (payload: { roomName: string }) => {
      socket.emit('createRoom', { roomName: payload.roomName, token: token });
    },

    setProfile: (payload: { name: string }) => {
      socket.emit('setProfile', { name: payload.name, token: token });
    },

    getProfile: () => {
      socket.emit('getProfile', { token: token });
    },

    sendChatMessage: (payload) => {
      socket.emit('chatMessage', { ...payload, token: token });
    },

    listRooms: () => {
      socket.emit('listRooms', { token: token });
    },
  };
};

export const useLobbyEmitter = (): LobbyEmitter => {
  const socket = useSocket();
  const { state } = useApp();
  return lobbyEmitterFactory(socket, state.token);
};
