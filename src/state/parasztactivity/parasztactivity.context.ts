import { createReducer } from '@reduxjs/toolkit';
import { createContext, useContext } from 'react';
import { ParasztactivityActions } from './parasztactivity.actions';

export type ParasztActivityState = {
  roomId: number;
  gameStarted: boolean;
  roundOver: boolean;
  gameOver: boolean;
  currentPlayer: string | null;
  currentWord: string | null;
  currentTurnStart: number | null;
  settings: {
    minWordPerPlayer: number;
    maxWordPerPlayer: number;
    turnLengthSeconds: number;
  };
  scores: { [playerId: string]: number };
};

export const initialState: ParasztActivityState = {
  roomId: -1,
  gameStarted: false,
  roundOver: false,
  gameOver: false,
  currentPlayer: null,
  currentWord: null,
  currentTurnStart: null,
  settings: {
    minWordPerPlayer: 0,
    maxWordPerPlayer: 3,
    turnLengthSeconds: 30,
  },
  scores: {},
};

export const reducer = createReducer(initialState, (builder) =>
  builder.addCase(ParasztactivityActions.gameState, (state, { payload }) => {
    state = { ...state, ...payload };
  }),
);

export const ParasztActivityContext = createContext(initialState);

export const useParasztActivity = (): ParasztActivityState => useContext(ParasztActivityContext);
