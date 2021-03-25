import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';

function Leaderboard(): JSX.Element {
  const {
    state: { room },
  } = useApp();
  const playerList = (room ? room.players : ([] as Player[])).map((player) => {
    return <li key={player.name}>{player.name}</li>;
  });

  return <ul>{playerList}</ul>;
}

export default Leaderboard;
