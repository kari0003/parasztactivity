import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { handshakeReply } from '../state/actions';
import { LobbyEmitter } from './socket.service';
import { EventHandlerFactory } from './namespacehandler';

export const handshakeHandlerFactory = (
  lobbyEmitter: LobbyEmitter,
  dispatch: Dispatch<AnyAction>,
): EventHandlerFactory => (socket: SocketIOClient.Socket) => {
  socket.on('handshakeReply', (response: { token: string }): void => {
    console.log('handshakeReply!', response, socket.id);
    sessionStorage.setItem('token', response.token);
    lobbyEmitter.getProfile();
    dispatch(handshakeReply(response));
  });
};
