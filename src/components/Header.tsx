import { openJoinRoom, openCreateRoom, leaveRoom } from '../state/actions';
import { useApp } from '../state/app.context';

function Header(): JSX.Element {
  const {
    state: { name, roomName, connected },
    dispatch,
  } = useApp();

  const leaveRoomHandler = () => {
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
      <div>{name}</div>
      <div>Room: {roomName}</div>
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
