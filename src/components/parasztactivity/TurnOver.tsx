import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocket } from '../../state/socket';
import Leaderboard from './Leaderboard';

function TurnOver(): JSX.Element {
  const state = useParasztActivity();
  const socket = useSocket();

  const handler = parasztactivityHandlerFactory(socket);

  const handleStartTurn = () => {
    handler.startTurn(state.roomId);
  };

  return (
    <div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">Turn Over!</div>
        <button onClick={handleStartTurn}>Start Turn</button>
      </div>
    </div>
  );
}

export default TurnOver;
