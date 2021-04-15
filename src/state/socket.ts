import { createContext, Dispatch, useContext, useEffect } from 'react';
import { AnyAction } from 'redux';
import io from 'socket.io-client';
import { handshakeHandlerFactory } from '../socketio/handshakeHandler';
import { createEventHandlerRegistry, EventHandlerRegistry } from '../socketio/namespacehandler';
import { registerParasztactivityHandler } from './parasztactivity/parasztactivity.handler';
import { registerHandlerFactory, useLobbyEmitter } from './socket.service';

const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:3005';

export const SocketContext = createContext(
  (() => {
    console.log('socket context creation');
    return io.connect(SOCKET_SERVER);
  })(),
);

export const useSocket = (): SocketIOClient.Socket => useContext(SocketContext);

export const useSocketEventHandler = (dispatch: Dispatch<AnyAction>): EventHandlerRegistry => {
  const socket = useSocket();
  const registry = createEventHandlerRegistry(socket, dispatch);
  return registry;
};
