import { createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, useContext } from 'react';
import { ChatMessage, Room } from '../interfaces';
import { chatMessageReceived, joinRoom, leaveRoom, listRoomsReply, openCreateRoom, openJoinRoom } from './actions';
import { ConnectionStatus } from './connection';

export interface AppState {
  openForm: 'createRoom' | 'joinRoom' | null;
  name: string;
  roomId: string;
  connected: boolean;
  rooms: Room[] | undefined;
  chat: {
    messages: ChatMessage[];
  };
  connection: {
    status: ConnectionStatus;
  };
}

export interface State {
  state: AppState;
  dispatch: Dispatch<any>;
}

export const initialAppState: AppState = {
  openForm: null,
  name: 'Főnökúr',
  roomId: 'Szoba 1',
  connected: false,
  rooms: undefined,
  chat: {
    messages: [{ name: 'Portás', message: 'Szia Uram!' }],
  },
  connection: {
    status: ConnectionStatus.CONNECTING,
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
    .addCase(joinRoom, (state, action) => {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
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
    .addDefaultCase((state) => state),
);

export const AppContext = createContext({} as State);

export const useApp = () => useContext(AppContext);
