import { FormEvent, useState } from 'react';
import { useLobbyEmitter } from '../socketio/socket.service';

function CreateRoomForm(): JSX.Element {
  const [formState, setState] = useState({ name: 'Vendégszoba' });

  const socketHandler = useLobbyEmitter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    createRoomHandler();
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const createRoomHandler = () => {
    socketHandler.createRoom({ roomName: formState.name });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Create Room</h1>
        <div>
          <label>
            Room Name:
            <input type="text" name="name" value={formState.name} onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateRoomForm;
