import { AnyAction } from 'redux';
import {
  AddWordPayload,
  ParasztactivityEvent,
  PublicGameState,
} from '../state/parasztactivity/parasztactivity.interfaces';
import { ParasztactivityActions } from '../state/parasztactivity/parasztactivity.actions';
import { EventHandlerFactory } from './namespacehandler';
import { Dispatch } from 'react';
import { useSocket } from '../state/socket';
import { useParasztactivity } from '../state/parasztactivity/parasztactivity.context';

export type ParasztactivityHandler = {
  getState: () => void;
  init: () => void;
  addWord: (word: string) => void;
  startTurn: () => void;
  startRound: () => void;
  startGame: () => void;
  drawWord: () => void;
  putBackWord: () => void;
  guessWord: (word: string, playerId: string) => void;
};

export const registerParasztactivityHandler = (dispatch: Dispatch<AnyAction>): EventHandlerFactory => (
  socket: SocketIOClient.Socket,
): void => {
  socket.on('gameState', (payload: { gameState: PublicGameState }) => {
    console.log('received gameState', payload);
    dispatch(ParasztactivityActions.gameState(payload.gameState));
  });

  socket.on('drawWordReply', (payload: { word: string }) => {
    console.log('drawnWord', payload);
    dispatch(ParasztactivityActions.drawWord(payload.word));
  });
  socket.on('putBackWordReply', (payload: { word: null }) => {
    console.log('putBackWord', payload);
    dispatch(ParasztactivityActions.putBackWord());
  });
};

export const parasztactivityHandlerFactory = (
  socket: SocketIOClient.Socket,
  roomId: number,
): ParasztactivityHandler => {
  const getState = (): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('getGameState', { game: 'parasztactivity', roomId });
  };

  const init = (): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }
    socket.emit('initGame', { game: 'parasztactivity', roomId });
  };

  const addWord = (word: string): void => {
    if (roomId === undefined) {
      console.log(' No room set up for parasztactivityHandler!!!');
      return;
    }

    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'addWord',
        roomId,
        payload: {
          word,
          playerId: socket.id,
        } as AddWordPayload,
      } as ParasztactivityEvent,
    });
  };

  const startGame = (): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startGame',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };
  const startRound = (): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startRound',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };
  const startTurn = (): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'startTurn',
        roomId,
        payload: {},
      } as ParasztactivityEvent,
    });
  };

  const drawWord = (): void => {
    console.log('drawing word');
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'drawWord',
        roomId,
        payload: {},
      },
    });
  };
  const putBackWord = (): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'putBackWord',
        roomId,
        payload: {},
      },
    });
  };

  const guessWord = (word: string, playerId: string): void => {
    socket.emit('gameEvent', {
      gameEvent: {
        game: 'parasztactivity',
        eventType: 'guessWord',
        roomId,
        payload: {
          playerId,
          guess: word,
        },
      },
    });
  };

  return {
    getState,
    init,
    addWord,
    startTurn,
    startRound,
    startGame,
    drawWord,
    putBackWord,
    guessWord,
  };
};

export const useParasztactivityEmitter = (): ParasztactivityHandler => {
  const socket = useSocket();
  const game = useParasztactivity();
  return parasztactivityHandlerFactory(socket, game.roomId);
};
