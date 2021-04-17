export type EventHandlerFactory = (socket: SocketIOClient.Socket) => void;
export type EventHandlerRegistry = {
  register: (name: string, eventHandlerFactory: EventHandlerFactory) => void;
};

export const createEventHandlerRegistry = (socket: SocketIOClient.Socket): EventHandlerRegistry => {
  const registry: Record<string, boolean> = {};
  const register: (name: string, eventHandlerFactory: EventHandlerFactory) => void = (name, handlerFactory) => {
    if (registry[name]) {
      console.log('eventhandler with name', name, 'already added');
      return;
    }
    handlerFactory(socket);
    registry[name] = true;
  };
  return {
    register,
  };
};
