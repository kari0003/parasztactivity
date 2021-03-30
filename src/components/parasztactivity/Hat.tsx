import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Hat(): JSX.Element {
  const state = useParasztActivity();
  const currentWord = state.currentWord || 'Állapotmentes';

  return (
    <div>
      <div>
        <div className="currentWord">{currentWord}</div>
      </div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <Timer></Timer>
          <button>Draw</button>
          <button>Return to Hat</button>
        </div>
      </div>
    </div>
  );
}

export default Hat;
