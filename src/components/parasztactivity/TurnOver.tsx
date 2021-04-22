import { useEffect, useState } from 'react';
import { useParasztactivityEmitter } from '../../socketio/parasztactivity.handler';

function TurnOver(): JSX.Element {
  const [countdownState, setCountdown] = useState(10);

  const handler = useParasztactivityEmitter();

  useEffect(() => {
    if (countdownState === 0) {
      handler.startTurn();
    }
    setTimeout(() => setCountdown(countdownState - 1), 1000);
  }, [countdownState]);

  const handleStartTurn = () => {
    handler.startTurn();
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
