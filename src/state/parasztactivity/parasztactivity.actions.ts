import { createAction } from '@reduxjs/toolkit';
import { PublicGameState } from './parasztactivity.interfaces';

export const ParasztactivityActions = {
  gameState: createAction<PublicGameState>('[Parasztactivity] Game State'),
  drawWord: createAction<string>('[Parasztactivity] Draw Word'),
  putBackWord: createAction('[Parasztactivity] Put Back Word'),
};
