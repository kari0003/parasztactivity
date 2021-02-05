
export enum RoomStatus {
  LOBBY = 'lobby',
  INGAME = 'ingame',
  STATS = 'stats',
}

export interface Room {
  name: string;
  id: number;
  status: RoomStatus;
}
