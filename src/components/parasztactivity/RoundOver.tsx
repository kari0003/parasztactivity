import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import Leaderboard from './Leaderboard';
import Timer from './Timer';

function RoundOver(): JSX.Element {
  const state = useParasztActivity();
  const currentWord = state.currentWord || 'Állapotmentes';

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
