import { useApp } from '../state/app.context';
import { useSocketHandler } from '../state/socket';

function RoomList(): JSX.Element {
  const {
    state: { rooms },
    dispatch,
  } = useApp();

  const socketHandler = useSocketHandler(dispatch);

  const listRoomsHandler = () => {
    console.log('listing Rooms');
    socketHandler.listRooms();
  };
  const list = rooms?.map((room) => {
    return (
      <li key={room.id}>
        {room.id} - {room.name}
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
