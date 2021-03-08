import { createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, useContext } from 'react';
import { ChatMessage, Room, Player } from '../interfaces';
import {
  chatMessageReceived,
  joinRoomReply,
  leaveRoom,
  listRoomsReply,
  onError,
  openCreateRoom,
  openJoinRoom,
  profileReceived,
} from './actions';
import { ConnectionStatus } from './connection';

export type AppConnection = {
  status: ConnectionStatus;
  error: string | null;
  message: string | null;
};

export interface AppState {
  openForm: 'createRoom' | 'joinRoom' | null;
  name: string;
  profile: Player | undefined;
  room: Room | undefined;
  connected: boolean;
  rooms: Room[] | undefined;
  chat: {
    messages: ChatMessage[];
  };
  connection: AppConnection;
}

export interface State {
  state: AppState;
  dispatch: Dispatch<any>;
}

export const initialAppState: AppState = {
  openForm: null,
  name: 'Főnökúr',
  profile: undefined,
  room: undefined,
  connected: false,
  rooms: undefined,
  chat: {
    messages: [{ name: 'Portás', message: 'Szia Uram!' }],
  },
  connection: {
    status: ConnectionStatus.CONNECTING,
    error: null,
    message: null,
  },
};

export const reducer = createReducer(initialAppState, (builder) =>
  builder

    .addCase(openCreateRoom, (state) => {
      state.openForm = 'createRoom';
    })
    .addCase(openJoinRoom, (state) => {
      state.openForm = 'joinRoom';
    })
    .addCase(joinRoomReply, (state, action) => {
      state.room = action.payload.room;
      state.chat.messages = action.payload.room.messages;
      state.connected = true;
      state.openForm = null;
    })
    .addCase(leaveRoom, (state) => {
      state.connected = false;
    })
    .addCase(listRoomsReply, (state, { payload }) => {
      state.rooms = payload.rooms;
    })
    .addCase(chatMessageReceived, (state, { payload }) => {
      state.chat.messages.push(payload);
    })
    .addCase(profileReceived, (state, { payload }) => {
      state.name = payload.name;
      state.profile = payload;
    })
    .addCase(onError, (state, { payload }) => {
      state.connection.error = payload.errorCode;
      state.connection.message = payload.errorMessage;
    })
    .addDefaultCase((state) => state),
);

export const AppContext = createContext({} as State);

export const useApp = () => useContext(AppContext);
