import { createAction } from '@reduxjs/toolkit';

export const joinRoom = createAction<{ name: string; roomId: string }>('[Global] Join Room');
export const leaveRoom = createAction('[Global] Leave Room');

export const connectRoom = createAction<{ name: string; roomId: string }>('[Global] Donnect Room');
export const disconnectRoom = createAction<{ roomId: string }>('[Global] Disconnect Room');

export const changeConnectForm = createAction<any>('Change Connect Form');
