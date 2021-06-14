import { AnyAction, createReducer } from '@reduxjs/toolkit';
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
  updateRoom,
  profileReceived,
  handshakeReply,
} from './actions';
import { ConnectionStatus } from './connection';
import { ParasztactivityActions } from './parasztactivity/parasztactivity.actions';
import { initialState, ParasztactivityState } from './parasztactivity/parasztactivity.context';

export type AppConnection = {
  status: ConnectionStatus;
  error: string | null;
  message: string | null;
};

export interface AppState {
  token: string | null;
  handshakeDone: boolean;
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
  game: ParasztactivityState;
}

export interface State {
  state: AppState;
  dispatch: Dispatch<AnyAction>;
}

export const initialAppState: AppState = {
  token: null,
  handshakeDone: false,
  openForm: null,
  name: 'Főnökúr',
  profile: undefined,
  room: undefined,
  connected: false,
  rooms: undefined,
  chat: {
    messages: [],
  },
  connection: {
    status: ConnectionStatus.CONNECTING,
    error: null,
    message: null,
  },
  game: initialState,
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
      state.game.roomId = action.payload.room.id;
      state.connected = true;
      state.openForm = null;
    })
    .addCase(updateRoom, (state, action) => {
      state.room = action.payload.room;
      state.game.roomId = action.payload.room.id;
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
    .addCase(handshakeReply, (state, { payload }) => {
      state.token = payload.token;
      state.handshakeDone = true;
    })
    .addCase(ParasztactivityActions.gameState, (state, { payload }) => {
      if (!payload.isCurrentWordDrawn || state.profile?.id !== payload.currentPlayer) {
        state.game.currentWord = null;
      }
      state.game = { ...state.game, ...payload };
    })
    .addCase(ParasztactivityActions.drawWord, (state, { payload }) => {
      state.game.currentWord = payload;
    })
    .addCase(ParasztactivityActions.putBackWord, (state) => {
      state.game.currentWord = null;
    })
    .addDefaultCase((state) => state),
);

export const AppContext = createContext({} as State);

export const useApp = (): State => useContext(AppContext);
