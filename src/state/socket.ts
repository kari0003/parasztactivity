import { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { createEventHandlerRegistry, EventHandlerRegistry } from '../socketio/namespacehandler';

const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:3005';

export const SocketContext = createContext(
  (() => {
    console.log('socket context creation');
    return io.connect(SOCKET_SERVER);
  })(),
);

export const useSocket = (): SocketIOClient.Socket => useContext(SocketContext);

export const useSocketEventHandler = (): EventHandlerRegistry => {
  const socket = useSocket();
  const registry = createEventHandlerRegistry(socket);
  return registry;
};
