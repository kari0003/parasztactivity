import { useEffect, useState } from 'react';
import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocket } from '../../state/socket';

function TurnOver(): JSX.Element {
  const state = useParasztActivity();
  const socket = useSocket();

  const [countdownState, setCountdown] = useState(10);

  const handler = parasztactivityHandlerFactory(socket);

  useEffect(() => {
    if (countdownState === 0) {
      handler.startTurn(state.roomId);
    }
    setTimeout(() => setCountdown(countdownState - 1), 1000);
  }, [countdownState]);

  const handleStartTurn = () => {
    handler.startTurn(state.roomId);
  };

  return (
    <div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">Turn Starts in {countdownState}!</div>
        <button onClick={handleStartTurn}>(Start Turn Now)</button>
      </div>
    </div>
  );
}

export default TurnOver;
