import { FormEvent, useState } from 'react';
import { useApp } from '../state/app.context';
import { useLobbyEmitter } from '../socketio/socket.service';

function JoinForm(): JSX.Element {
  const {
    state: { name, room },
  } = useApp();
  const [formState, setState] = useState({ name: name, roomName: room ? room.name : '' });

  const socketHandler = useLobbyEmitter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    connectRoomHandler();
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
    if (event.target.name === 'name') {
      socketHandler.setProfile({ name: event.target.value });
    }
  };

  const connectRoomHandler = () => {
    socketHandler.joinRoom({ name: formState.name, roomName: formState.roomName });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Join</h1>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formState.name} onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            Room:
            <input type="text" name="roomName" value={formState.roomName} onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default JoinForm;
