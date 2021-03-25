import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';
import Chat from '../chat/Chat';
import Hat from './Hat';
import Leaderboard from './Leaderboard';
import './Parasztactivity.css';

function Parasztactivity(): JSX.Element {
  const {
    state: { room },
  } = useApp();

  const playerList = (room ? room.players : ([] as Player[])).map((player) => {
    return <li key={player.name}>{player.name}</li>;
  });

  return (
    <div className="wrapper">
      <Hat></Hat>
      <Chat></Chat>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Parasztactivity;