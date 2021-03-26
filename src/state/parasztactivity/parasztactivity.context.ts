import { createContext, useContext } from 'react';

export type ParasztActivityState = {
  roomId: number;
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

export const ParasztActivityContext = createContext(initialState);

export const useParasztActivity = () => useContext(ParasztActivityContext);
