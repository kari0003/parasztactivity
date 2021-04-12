import { createContext, Dispatch, useContext, useEffect } from 'react';
import { AnyAction } from 'redux';
import io from 'socket.io-client';
import { registerParasztactivityHandler } from './parasztactivity/parasztactivity.handler';
import { registerHandler } from './socket.service';

const SOCKET_SERVER = 'http://localhost:3005';
//const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

export const SocketContext = createContext(
  (() => {
    console.log('socket context creation');
    return io.connect(SOCKET_SERVER);
  })(),
);

export const useSocket = (): SocketIOClient.Socket => useContext(SocketContext);

export const useSocketEventHandler = (dispatch: Dispatch<AnyAction>): void => {
  const socket = useSocket();
  useEffect(() => {
    console.log('register in progress for socket fixed?', socket.id);
    registerHandler(socket, dispatch);
    registerParasztactivityHandler(socket, dispatch);
  }, [dispatch, socket]);
};
