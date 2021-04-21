import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocket } from '../../state/socket';
import Timer from './Timer';

function Hat(): JSX.Element {
  const state = useParasztActivity();
  const currentWord = state.currentWord || 'Állapotmentes';

  const socket = useSocket();

  const handler = parasztactivityHandlerFactory(socket);

  const handleDraw = () => {
    handler.drawWord(state.roomId);
  };

  const handleReturn = () => {
    handler.putBackWord(state.roomId);
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
