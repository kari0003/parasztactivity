import { AnyAction } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useApp } from './app.context';
import { SocketHandler, socketHandlerFactory } from './app.service';

const SOCKET_SERVER = 'http://localhost:3005';
//const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

let handler: SocketHandler;

const getSocketSingleton = (dispatch: React.Dispatch<any>): SocketHandler => {
  if (!handler) {
    const socket = io.connect(SOCKET_SERVER);
    handler = socketHandlerFactory(socket, dispatch);
    return handler;
  }
  if (handler.socket.disconnected) {
    handler.socket.connect();
    return handler;
  }
  return handler;
};

export const useSocketHandler = () => {
  const { dispatch } = useApp();
  return getSocketSingleton(dispatch);
};
