import './App.css';
import CreateRoomForm from './components/CreateRoomForm';
import JoinForm from './components/JoinForm';
import Lobby from './components/Lobby';
import RoomList from './components/RoomList';
import { useApp } from './state/app.context';

function AppBody(): JSX.Element {
  const { state } = useApp();
  return (
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
  );
}

export default AppBody;
