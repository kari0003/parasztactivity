import { useApp } from '../state/app.context';
import { useLobbyEmitter } from '../state/socket.service';

function RoomList(): JSX.Element {
  const {
    state: { rooms, name },
  } = useApp();

  const socketHandler = useLobbyEmitter();

  const listRoomsHandler = () => {
    socketHandler.listRooms();
  };

  const joinRoomHandler = (roomName: string) => {
    socketHandler.joinRoom({ name, roomName });
  };

  const list = rooms?.map((room) => {
    return (
      <li key={room.id}>
        {room.id} - {room.name} <button onClick={() => joinRoomHandler(`${room.name}`)}>Join</button>
      </li>
    );
  });
  return (
    <div className="RoomList">
      <ul>{list}</ul>
      <button onClick={listRoomsHandler}>Refresh</button>
    </div>
  );
}

export default RoomList;
