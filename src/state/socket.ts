import { AnyAction } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { socketHandlerFactory } from './app.service';

const SOCKET_SERVER = 'http://localhost:3005';
//const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

export const useSocketHandler = (dispatch: React.Dispatch<AnyAction>) => {
  const { current: socket } = useRef(io.connect(SOCKET_SERVER));
  useEffect(() => {
    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);
  const socketHandler = socketHandlerFactory(socket, dispatch);
  return socketHandler;
};
