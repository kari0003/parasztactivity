import { GameEvent } from '../../interfaces';

export type EventTypes = 'addWord' | 'drawWord' | 'putBackWord' | 'guessWord' | 'resetGame' | 'endTurn' | 'startTurn';

export type Payloads =
  | AddWordPayload
  | DrawWordPayload
  | ResetGamePayload
  | PutBackWordPayload
  | GuessWordPayload
  | EndTurnPayload
  | StartTurnPayload;

export interface ParasztactivityEvent extends GameEvent {
  game: 'parasztactivity';
  eventType: EventTypes;
  roomId: number;
  payload: Payloads;
}

export type PublicGameState = {
  roomId: number;
  currentPlayer: string | null;
  currentTurnStart: number | null;
  settings: {
    minWordPerPlayer: number;
    maxWordPerPlayer: number;
    turnLengthSeconds: number;
  };
  scores: { [playerId: string]: number };
};

export type AddWordPayload = {
  playerId: string;
  word: string;
};

export type DrawWordPayload = {};

export type ResetGamePayload = {};

export type PutBackWordPayload = {};

export type GuessWordPayload = {
  playerId: string;
  guess: string;
};

export type EndTurnPayload = {};

export type StartTurnPayload = {
  playerId: string;
};
