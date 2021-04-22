import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Guesser(): JSX.Element {
  const state = useParasztactivity();
  const currentWord = '*********';

  return (
    <div>
      <div>
        <div className="currentWord">{currentWord}</div>
      </div>
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <Timer></Timer>
          <div>{state.currentPlayer} is describing words.</div>
        </div>
      </div>
    </div>
  );
}

export default Guesser;
