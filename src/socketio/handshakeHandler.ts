import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { handshakeReply } from '../state/actions';
import { LobbyEmitter } from '../state/socket.service';

export const handshakeHandlerFactory = (lobbyEmitter: LobbyEmitter) => (
  socket: SocketIOClient.Socket,
  dispatch: Dispatch<AnyAction>,
) => {
  console.log('this has run');
  socket.on('handshakeReply', (response: { token: string }): void => {
    console.log('handshakeReply!', response, socket.id);
    sessionStorage.setItem('token', response.token);
    lobbyEmitter.getProfile();
    dispatch(handshakeReply(response));
  });
};
