import React, { useEffect, useReducer } from 'react';
import './App.css';
import { handshakeHandlerFactory, handshakeEmitterFactory } from './socketio/handshakeHandler';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import { registerParasztactivityHandler } from './socketio/parasztactivity.handler';
import { useSocket, useSocketEventHandler } from './state/socket';
import { lobbyEmitterFactory, registerHandlerFactory } from './socketio/socket.service';
import { drawingBoardHandlerFactory } from './socketio/drawingBoardHandler';

function ContextWrapper(props: { children: React.ReactNode }): JSX.Element {
  const existingToken = sessionStorage.getItem('token');
  const existingName = localStorage.getItem('name');
  const [state, dispatch] = useReducer(reducer, {
    ...initialAppState,
    token: existingToken,
    name: existingName || 'Senki',
  });
  const socket = useSocket();
  const registry = useSocketEventHandler();

  useEffect(() => {
    registry.register('lobby', registerHandlerFactory(dispatch));
    registry.register(
      'handshake',
      handshakeHandlerFactory(
        lobbyEmitterFactory(socket, state.token),
        handshakeEmitterFactory(socket, state.token, existingName),
        dispatch,
      ),
    );
    registry.register('parasztactivity', registerParasztactivityHandler(dispatch));
    // registry.register('drawingBoard', drawingBoardHandlerFactory());
    console.log('register effect has run for', socket.id);
  }, [socket]);

  const initialState: State = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={initialState}>{props.children}</AppContext.Provider>;
}

export default ContextWrapper;
