import { Player } from '../interfaces';
import { useApp } from '../state/app.context';
import Chat from './chat/Chat';

function Lobby(): JSX.Element {
  const {
    state: { room },
  } = useApp();

  const playerList = (room ? room.players : ([] as Player[])).map((player) => {
    return <li key={player.name}>{player.name}</li>;
  });
  return (
    <div className="Lobby">
      <h1>{room ? room.name : ''}</h1>
      <ul>{playerList}</ul>
      <Chat></Chat>
    </div>
  );
}

export default Lobby;
