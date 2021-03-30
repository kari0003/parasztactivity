import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Guesser(): JSX.Element {
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
        </div>
      </div>
    </div>
  );
}

export default Guesser;
