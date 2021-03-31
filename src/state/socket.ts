import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import io from 'socket.io-client';
import { useApp } from './app.context';
import { ParasztactivityHandler, parasztactivityHandlerFactory } from './parasztactivity/parasztactivity.handler';
import { SocketHandler, socketHandlerFactory } from './socket.service';

const SOCKET_SERVER = 'http://localhost:3005';
//const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

let socket: SocketIOClient.Socket;
let handler: SocketHandler;
let pHandlerDict: ParasztactivityHandler;

const getSocketSingleton = (): SocketIOClient.Socket => {
  if (!socket) {
    socket = io.connect(SOCKET_SERVER);
  }
  if (socket.disconnected) {
    socket.connect();
  }
  return socket;
};

const getHandlerSingleton = (dispatch: Dispatch<AnyAction>): SocketHandler => {
  if (!handler) {
    const socket = getSocketSingleton();
    handler = socketHandlerFactory(socket, dispatch);
  }
  return handler;
};

export const useSocketHandler = (): SocketHandler => {
  const { dispatch } = useApp();
  return getHandlerSingleton(dispatch);
};

const getPSingleton = (dispatch: Dispatch<AnyAction>, roomId: number | undefined): ParasztactivityHandler => {
  if (!pHandlerDict) {
    const socket = getSocketSingleton();
    pHandlerDict = parasztactivityHandlerFactory(socket, dispatch, roomId);
  }
  return pHandlerDict;
};

export const useParasztActivitySocketHandler = () => {
  const { dispatch, state } = useApp();
  return getPSingleton(dispatch, state.room?.id);
};
