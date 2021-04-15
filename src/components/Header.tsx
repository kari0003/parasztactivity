import { openJoinRoom, openCreateRoom, leaveRoom } from '../state/actions';
import { useApp } from '../state/app.context';
import { useLobbyEmitter } from '../state/socket.service';

function Header(): JSX.Element {
  const {
    state: { profile, room, connected },
    dispatch,
  } = useApp();

  const socketHandler = useLobbyEmitter();

  const leaveRoomHandler = () => {
    socketHandler.leaveRoom({ roomName: room ? room.name : '' });
    dispatch(leaveRoom());
  };

  const joinRoomHandler = () => {
    dispatch(openJoinRoom());
  };

  const createRoomHandler = () => {
    dispatch(openCreateRoom());
  };
  return connected ? (
    <div className="header">
      <div>{profile?.name}</div>
      <div>Room: {room ? room.name : ''}</div>
      <div>
        <button onClick={leaveRoomHandler}>Leave Room</button>
      </div>
    </div>
  ) : (
    <div className="header notInRoom">
      <button onClick={joinRoomHandler}>Join</button>
      <button onClick={createRoomHandler}>Create</button>
    </div>
  );
}

export default Header;
