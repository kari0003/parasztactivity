import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { connect, disconnect, handshakeReply } from '../state/actions';
import { LobbyEmitter } from './socket.service';
import { EventHandlerFactory } from './namespacehandler';

export type HandshakeEmitter = {
  handshake: () => void;
};

export const handshakeHandlerFactory = (
  lobbyEmitter: LobbyEmitter,
  handshakeEmitter: HandshakeEmitter,
  dispatch: Dispatch<AnyAction>,
): EventHandlerFactory => (socket: SocketIOClient.Socket) => {
  socket.on('handshakeReply', (response: { token: string }): void => {
    console.log('handshakeReply!', response, socket.id);
    sessionStorage.setItem('token', response.token);
    lobbyEmitter.getProfile();
    dispatch(handshakeReply(response));
  });

  socket.on('connect', () => {
    console.log('Connected!', socket.id);
    handshakeEmitter.handshake();
    dispatch(connect());
  });

  socket.on('disconnect', () => {
    console.log('Disconnected!', socket.id);
    dispatch(disconnect());
  });
};

export const handshakeEmitterFactory = (
  socket: SocketIOClient.Socket,
  token: string | null,
  name?: string | null,
): HandshakeEmitter => {
  return {
    handshake: () => {
      socket.emit('handshake', { token, name });
    },
  };
};
