import { useReducer } from 'react';
import './App.css';
import CreateRoomForm from './components/CreateRoomForm';
import Header from './components/Header';
import JoinForm from './components/JoinForm';
import Lobby from './components/Lobby';
import RoomList from './components/RoomList';
import StatusBar from './components/StatusBar';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import { useSocketHandler } from './state/socket';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  const initialState: State = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={initialState}>
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
      <StatusBar></StatusBar>
    </AppContext.Provider>
  );
}

export default App;
