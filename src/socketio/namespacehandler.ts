import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export type EventHandlerFactory = (socket: SocketIOClient.Socket, dispatch: Dispatch<AnyAction>) => void;
export type EventHandlerRegistry = {
  register: (name: string, eventHandlerFactory: EventHandlerFactory) => void;
};

export const createEventHandlerRegistry = (
  socket: SocketIOClient.Socket,
  dispatch: Dispatch<AnyAction>,
): EventHandlerRegistry => {
  const registry: Record<string, boolean> = {};
  const register: (name: string, eventHandlerFactory: EventHandlerFactory) => void = (name, handlerFactory) => {
    if (registry[name]) {
      console.log('eventhandler with name', name, 'already added');
      return;
    }
    handlerFactory(socket, dispatch);
    registry[name] = true;
  };
  return {
    register,
  };
};
