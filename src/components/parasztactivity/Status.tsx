import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';

function Status(): JSX.Element {
  const state = useParasztActivity();
  const currentWord = state.currentWord || 'Állapotmentes';

  return (
    <div>
      <div>
        <div className="statusMessage correct">`{currentWord}` guessed by Mesterember!</div>
      </div>
      <div>
        <div className="statusMessage info">Lejárt az idő! Következő játékos: Tetőszedő</div>
      </div>
    </div>
  );
}

export default Status;
