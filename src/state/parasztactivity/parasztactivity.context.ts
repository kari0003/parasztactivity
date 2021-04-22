import { useApp } from '../app.context';

export type ParasztactivityState = {
  roomId: number;
  gameOver: boolean;
  currentPlayer: string | null;
  currentWord: string | null;
  currentTurnStart: number | null;
  isGameStarted: boolean;
  isTurnInProgress: boolean;
  isRoundInProgress: boolean;
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
  gameOver: false,
  currentPlayer: null,
  currentWord: null,
  currentTurnStart: null,
  isGameStarted: false,
  isTurnInProgress: false,
  isRoundInProgress: false,
  settings: {
    minWordPerPlayer: 0,
    maxWordPerPlayer: 3,
    turnLengthSeconds: 30,
  },
  scores: {},
  hatWordCount: 0,
};

export const useParasztactivity = (): ParasztactivityState => {
  const { state } = useApp();
  return state.game;
};
