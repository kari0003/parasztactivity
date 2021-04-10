import { Dispatch, useState } from 'react';
import { AnyAction } from 'redux';
import io from 'socket.io-client';
import { useApp } from './app.context';
import { SocketHandler, socketHandlerFactory } from './socket.service';

const SOCKET_SERVER = 'http://localhost:3005';
//const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

export const useSocketSingleton = (): SocketIOClient.Socket => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
  if (!socket) {
    console.log('forgot socket :(');
    const newSocket = io.connect(SOCKET_SERVER);
    setSocket(newSocket);
    return newSocket;
  }
  return socket;
};

const useHandlerSingleton = (dispatch: Dispatch<AnyAction>): SocketHandler => {
  const [handler, setHandler] = useState<SocketHandler | undefined>(undefined);
  const singletonSocket = useSocketSingleton();
  if (!singletonSocket) {
    throw new Error('Socket not yet initialized!');
  }
  if (!handler) {
    console.log('registering handler');
    const newHandler = socketHandlerFactory(singletonSocket, dispatch);
    setHandler(newHandler);
    return newHandler;
  }
  return handler;
};

export const useSocketHandler = (): SocketHandler => {
  const { dispatch } = useApp();
  return useHandlerSingleton(dispatch);
};
