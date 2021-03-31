import { createAction } from '@reduxjs/toolkit';
import { PublicGameState } from './parasztactivity.interfaces';

export const ParasztactivityActions = {
  gameState: createAction<PublicGameState>('[Parasztactivity] Game State'),
};
