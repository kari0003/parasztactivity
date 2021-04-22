import { useParasztactivityEmitter } from '../../socketio/parasztactivity.handler';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';
import Leaderboard from './Leaderboard';

function GameOver(): JSX.Element {
  const state = useParasztactivity();

  const handler = useParasztactivityEmitter();

  const handleStartRound = () => {
    handler.startRound();
  };

  return (
    <div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          {state.gameOver && Object.keys(state.scores).length > 0 ? 'Game Over!' : 'Round Over!'}
        </div>
        {!state.gameOver ? <button onClick={handleStartRound}>Start Round</button> : <></>}
        <Leaderboard></Leaderboard>
      </div>
    </div>
  );
}

export default GameOver;
