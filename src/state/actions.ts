import { createAction } from '@reduxjs/toolkit';
import { ChatMessage, Player, Room, UserError } from '../interfaces';

export const openJoinRoom = createAction('[Global] Open Join Room');
export const openCreateRoom = createAction('[Global] Open Create Room');

export const joinRoomReply = createAction<{ room: Room }>('[Global] Join Room Reply');
export const leaveRoom = createAction('[Global] Leave Room');

export const createRoom = createAction<{ roomName: string }>('[Global] Create Room');
export const createRoomReply = createAction<{ room: Room }>('[Global] Create Room Reply');
export const listRoomsReply = createAction<{ rooms: Room[] }>('[Global] List Rooms Reply');
export const updateRoom = createAction<{ room: Room }>('[Global] Update Room');

export const chatMessageReceived = createAction<ChatMessage>('[Global] Chat Message Received');
export const profileReceived = createAction<Player>('[Global] Profile received');

export const connectRoom = createAction('[Global] Connect Room');
export const disconnectRoom = createAction<{ roomId: string }>('[Global] Disconnect Room');

export const onError = createAction<UserError>('[Global] On Error');
