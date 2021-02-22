import { FormEvent, useState } from 'react';
import { joinRoom } from '../state/actions';
import { useApp } from '../state/app.context';

function JoinForm(): JSX.Element {
  const {
    state: { name, roomName },
    dispatch,
  } = useApp();
  const [formState, setState] = useState({ name: name, roomName: roomName });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    connectRoomHandler();
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const connectRoomHandler = () => {
    dispatch(joinRoom({ name: formState.name, roomName: formState.roomName }));
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
