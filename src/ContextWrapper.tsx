import { useEffect, useReducer } from 'react';
import App from './App';
import './App.css';
import { handshakeHandlerFactory } from './socketio/handshakeHandler';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import { registerParasztactivityHandler } from './state/parasztactivity/parasztactivity.handler';
import { useSocket, useSocketEventHandler } from './state/socket';
import { lobbyEmitterFactory, registerHandlerFactory } from './state/socket.service';

function ContextWrapper(): JSX.Element {
  const existingToken = sessionStorage.getItem('token');
  const existingName = localStorage.getItem('name') || 'Senki';
  const [state, dispatch] = useReducer(reducer, { ...initialAppState, token: existingToken, name: existingName });
  const socket = useSocket();
  const registry = useSocketEventHandler(dispatch);

  useEffect(() => {
    registry.register('lobby', registerHandlerFactory);
    registry.register('handshake', handshakeHandlerFactory(lobbyEmitterFactory(socket, state.token)));
    registry.register('parasztactivity', registerParasztactivityHandler);
    console.log('register effect has run');
  }, [socket, state.token]);

  const initialState: State = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={initialState}>
      <App></App>
    </AppContext.Provider>
  );
}

export default ContextWrapper;
