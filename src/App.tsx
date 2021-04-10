import { useEffect, useReducer } from 'react';
import { applyMiddleware } from 'redux';
import './App.css';
import CreateRoomForm from './components/CreateRoomForm';
import Header from './components/Header';
import JoinForm from './components/JoinForm';
import Lobby from './components/Lobby';
import RoomList from './components/RoomList';
import StatusBar from './components/StatusBar';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import { useSocket, useSocketEventHandler } from './state/socket';

function App(): JSX.Element {
  const existingToken = sessionStorage.getItem('token');
  const [state, dispatch] = useReducer(reducer, { ...initialAppState, token: existingToken });
  useSocketEventHandler(dispatch);

  const socket = useSocket();

  useEffect(() => {
    console.log('handshaking', socket.id, state.token);
    socket.emit('handshake', { token: state.token });
  }, [socket]);

  const initialState: State = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={initialState}>
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
    </AppContext.Provider>
  );
}

export default App;
