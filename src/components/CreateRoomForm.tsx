import { FormEvent, useState } from 'react';
import { createRoom } from '../state/actions';
import { useApp } from '../state/app.context';

function CreateRoomForm(): JSX.Element {
  const { dispatch } = useApp();
  const [formState, setState] = useState({ name: 'Vendégszoba' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    createRoomHandler();
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const createRoomHandler = () => {
    dispatch(createRoom({ roomName: formState.name }));
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
