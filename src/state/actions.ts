import { createAction } from '@reduxjs/toolkit';
import { Room } from '../interfaces';

export const joinRoom = createAction<{ name: string; roomId: string }>('[Global] Join Room');
export const joinRoomReply = createAction<{ room: Room }>('[Global] Join Room Reply');
export const leaveRoom = createAction('[Global] Leave Room');

export const createRoom = createAction<{ roomName: string }>('[Global] Create Room');
export const createRoomReply = createAction<{ room: Room }>('[Global] Create Room Reply');
export const listRoomsReply = createAction<{ rooms: Room[] }>('[Global] List Rooms Reply');

export const connectRoom = createAction('[Global] Connect Room');
export const disconnectRoom = createAction<{ roomId: string }>('[Global] Disconnect Room');
