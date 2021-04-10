import { Manager } from 'socket.io-client';

type EventHandler = () => void;

type NamespaceHandler = {
  registerEventHandler: (event: string, handler: EventHandler) => void;
  emit: (event: string, payload: any) => void;
};

export const namespaceHandlerFactory = (manager: SocketIOClient.Manager, namespace: string) => {
  let socket: SocketIOClient.Socket;
  // handle reconnect, etc
};

export const eventHandlerFactory = (dispatch: any) => {};
