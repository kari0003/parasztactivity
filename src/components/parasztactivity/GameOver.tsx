import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocket } from '../../state/socket';
import Leaderboard from './Leaderboard';

function GameOver(): JSX.Element {
  const state = useParasztActivity();
  const socket = useSocket();

  const handler = parasztactivityHandlerFactory(socket);

  const handleStartRound = () => {
    handler.startRound(state.roomId);
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
