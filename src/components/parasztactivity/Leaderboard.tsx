import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';

function Leaderboard(): JSX.Element {
  const {
    state: { room },
  } = useApp();

  const parasztactivityState = useParasztActivity();

  const playerList = (room ? room.players : ([] as Player[])).map((player) => {
    const score = parasztactivityState.scores[player.id] || 0;
    return (
      <li key={player.name}>
        {player.name} : {score}
      </li>
    );
  });

  return <ul>{playerList}</ul>;
}

export default Leaderboard;
