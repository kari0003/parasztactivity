import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';

function Leaderboard(): JSX.Element {
  const {
    state: { room },
  } = useApp();

  const parasztactivityState = useParasztactivity();

  const playerList = (room ? room.players : ([] as Player[])).map((player) => {
    const score = parasztactivityState.scores[player.id] || 0;
    return (
      <li key={player.id}>
        {player.name} : {score}
      </li>
    );
  });

  return <ul>{playerList}</ul>;
}

export default Leaderboard;
