import { leaveRoom } from '../state/actions';
import { useApp } from '../state/app.context';

function Header(): JSX.Element {
  const {
    state: { name, roomId, connected },
    dispatch,
  } = useApp();

  const leaveRoomHandler = () => {
    dispatch(leaveRoom());
  };
  return connected ? (
    <div className="header">
      <div>{name}</div>
      <div>Room: {roomId}</div>
      <div>
        <button onClick={leaveRoomHandler}>Leave Room</button>
      </div>
    </div>
  ) : (
    <div className="header">
      <button onClick={leaveRoomHandler}>Join Room</button>
    </div>
  );
}

export default Header;
