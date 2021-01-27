import { FormEvent } from 'react';

function Header(props: { connected: boolean; name?: string; roomId?: string }): JSX.Element {
  const connectForm = { name: props.name || 'Főnökúr', roomId: '' };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    connectRoom();
    event.preventDefault();
  };
  const connectRoom = () => {
    console.log('connect Room', connectForm);
  };
  const leaveRoom = () => {
    console.log('Leave Room');
  };
  if (props.connected) {
    return (
      <div className="header">
        <div>{props.name}</div>
        <div>Room: {props.roomId}</div>
        <div>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      </div>
    );
  }
  return (
    <div className="header">
      <form onSubmit={handleSubmit}></form>
      <div>
        <label>
          Name:
          <input type="text" value={connectForm.name} />
        </label>
      </div>
      <div>
        <label>
          Room:
          <input type="text" value={connectForm.roomId} />
        </label>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </div>
  );
}

export default Header;
