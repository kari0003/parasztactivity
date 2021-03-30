export enum RoomStatus {
  LOBBY = 'lobby',
  INGAME = 'ingame',
  STATS = 'stats',
}

export type ChatMessage = { name: string; message: string };

export interface Room {
  name: string;
  id: number;
  status: RoomStatus;
  messages: ChatMessage[];
  players: Player[];
}

export type UserError = {
  errorCode: string;
  errorMessage: string;
};

export interface Player {
  id: string;
  name: string;
  lastUpdated: Date;
}

export interface GameEvent {
  game: string;
  eventType: string;
  roomId: number;
  payload: unknown;
}
