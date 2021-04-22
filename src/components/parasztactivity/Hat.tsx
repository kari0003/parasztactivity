import { useParasztactivityEmitter } from '../../socketio/parasztactivity.handler';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Hat(): JSX.Element {
  const state = useParasztactivity();
  const currentWord = state.currentWord || 'Állapotmentes';

  const handler = useParasztactivityEmitter();

  const handleDraw = () => {
    handler.drawWord();
  };

  const handleReturn = () => {
    handler.putBackWord();
  };

  return (
    <div>
      <div>
        <div className="currentWord">{currentWord}</div>
      </div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <Timer></Timer>
          <button onClick={handleDraw}>Draw</button>
          <button onClick={handleReturn}>Return to Hat</button>
        </div>
      </div>
    </div>
  );
}

export default Hat;
