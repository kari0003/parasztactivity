import { useApp } from '../app.context';

export type ParasztactivityState = {
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
  hatWordCount: number;
};

export const initialState: ParasztactivityState = {
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
  hatWordCount: 0,
};

export const useParasztActivity = (): ParasztactivityState => {
  const { state } = useApp();
  return state.game;
};
