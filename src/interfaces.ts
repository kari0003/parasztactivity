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
}
