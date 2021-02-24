import { createAction } from '@reduxjs/toolkit';
import { Room, UserError } from '../interfaces';

export const openJoinRoom = createAction('[Global] Open Join Room');
export const openCreateRoom = createAction('[Global] Open Create Room');

export const joinRoom = createAction<{ name: string; roomName: string }>('[Global] Join Room');
export const joinRoomReply = createAction<{ room: Room }>('[Global] Join Room Reply');
export const leaveRoom = createAction('[Global] Leave Room');

export const createRoom = createAction<{ roomName: string }>('[Global] Create Room');
export const createRoomReply = createAction<{ room: Room }>('[Global] Create Room Reply');
export const listRoomsReply = createAction<{ rooms: Room[] }>('[Global] List Rooms Reply');

export const chatMessageReceived = createAction<{ name: string; message: string }>('[Global] Chat Message Received');

export const connectRoom = createAction('[Global] Connect Room');
export const disconnectRoom = createAction<{ roomId: string }>('[Global] Disconnect Room');

export const onError = createAction<UserError>('[Global] On Error');
