import { useApp } from '../state/app.context';
import Chat from './chat/Chat';

function Lobby(): JSX.Element {
  const {
    state: { roomName },
  } = useApp();
  const players = [{ name: 'Kek1' }, { name: 'Kek2' }, { name: 'Kek3' }];

  const playerList = players.map((player) => {
    return <li key={player.name}>{player.name}</li>;
  });
  return (
    <div className="Lobby">
      <h1>{roomName}</h1>
      <ul>{playerList}</ul>
      <Chat></Chat>
    </div>
  );
}

export default Lobby;
