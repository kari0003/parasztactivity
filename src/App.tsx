import { useEffect } from 'react';
import './App.css';
import CreateRoomForm from './components/CreateRoomForm';
import Header from './components/Header';
import JoinForm from './components/JoinForm';
import Lobby from './components/Lobby';
import RoomList from './components/RoomList';
import StatusBar from './components/StatusBar';
import { handshakeHandlerFactory } from './socketio/handshakeHandler';
import { useApp } from './state/app.context';
import { useSocket, useSocketEventHandler } from './state/socket';
import { registerHandlerFactory, useLobbyEmitter } from './state/socket.service';
import { registerParasztactivityHandler } from './state/parasztactivity/parasztactivity.handler';

function App(): JSX.Element {
  const { state, dispatch } = useApp();
  const registry = useSocketEventHandler(dispatch);
  const socket = useSocket();

  useEffect(() => {
    console.log('handshaking', socket.id, state.token);
    socket.emit('handshake', { token: state.token });
  }, [socket, state.token]);

  const lobbyEmitter = useLobbyEmitter();

  registry.register('lobby', registerHandlerFactory);
  registry.register('handshake', handshakeHandlerFactory(lobbyEmitter));
  registry.register('parasztactivity', registerParasztactivityHandler);

  return (
    <>
      <StatusBar></StatusBar>
      <div className="background container">
        <Header></Header>
        <div className="wrapper">
          {state.connected ? (
            <Lobby></Lobby>
          ) : (
            <div>
              <h1>Parasztactivity</h1>
              {state.openForm === 'joinRoom' ? <JoinForm></JoinForm> : null}
              {state.openForm === 'createRoom' ? <CreateRoomForm></CreateRoomForm> : null}
              <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="App-logo" alt="logo" />
              <p>Coming Soon</p>
              <RoomList></RoomList>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
