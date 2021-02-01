import { createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, useContext } from 'react';
import { joinRoom, leaveRoom } from './actions';

export interface AppState {
  name: string;
  roomId: string;
  connected: boolean;
}

export interface State {
  state: AppState;
  dispatch: Dispatch<any>;
}

export const initialAppState: AppState = {
  name: 'Főnökúr',
  roomId: 'Szoba 1',
  connected: false,
};

export const reducer = createReducer(initialAppState, (builder) =>
  builder
    .addCase(joinRoom, (state, action) => {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.connected = true;
    })
    .addCase(leaveRoom, (state) => {
      state.connected = false;
    })
    .addDefaultCase((state) => state),
);

export const AppContext = createContext({} as State);

export const useApp = () => useContext(AppContext);
