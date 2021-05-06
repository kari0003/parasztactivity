import './App.css';
import CreateRoomForm from './components/CreateRoomForm';
import DrawingBoard from './components/drawing/DrawingBoard';
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
          <img
            src={`${process.env.PUBLIC_URL}/fedora.png`}
            className="App-logo animate__animated animate__flipInX"
            alt="logo"
          />
          <p>Coming Soon</p>
          <RoomList></RoomList>
          <br />
          <DrawingBoard></DrawingBoard>
        </div>
      )}
    </div>
  );
}

export default AppBody;
