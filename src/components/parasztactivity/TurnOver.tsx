import { useEffect, useState } from 'react';
import { Player } from '../../interfaces';
import { useParasztactivityEmitter } from '../../socketio/parasztactivity.handler';
import { useApp } from '../../state/app.context';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';

function TurnOver(): JSX.Element {
  const gameState = useParasztactivity();
  const { state } = useApp();
  const [countdownState, setCountdown] = useState(10);

  const handler = useParasztactivityEmitter();

  useEffect(() => {
    if (countdownState > 0) {
      const timer = setTimeout(() => setCountdown(countdownState - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownState]);

  const handleStartTurn = () => {
    handler.startTurn();
  };

  const nextPlayer = (roundRobinIndex: number, players: Player[]) => {
    const index = roundRobinIndex + 1 >= players.length ? 0 : roundRobinIndex + 1;
    return players[index]?.name || '';
  };

  return (
    <div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <div>Turn Starts in {countdownState}!</div>
          <div>Next Player: {nextPlayer(gameState.roundRobinIndex, state.room?.players || [])}</div>
        </div>
        <button onClick={handleStartTurn}>(Start Turn Now)</button>
      </div>
    </div>
  );
}

export default TurnOver;
