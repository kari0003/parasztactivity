import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import Leaderboard from './Leaderboard';

function RoundOver(): JSX.Element {
  const state = useParasztActivity();

  return (
    <div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">{state.gameOver ? 'Game Over!' : 'Round Over!'}</div>
        <Leaderboard></Leaderboard>
      </div>
    </div>
  );
}

export default RoundOver;
