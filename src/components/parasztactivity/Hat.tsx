import { FormEvent, useState } from 'react';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocketHandler } from '../../state/socket';
import Timer from './Timer';

function Hat(): JSX.Element {
  const state = useParasztActivity();
  const currentWord = state.currentWord || 'Állapotmentes';

  const [formState, setState] = useState({ word: '' });

  const socketHandler = useSocketHandler();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //   addWordHandler();
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <div className="game">
      <form onSubmit={handleSubmit}>
        <h1>Set Up</h1>
        <div>
          <label>
            Add word to Hat:
            <input type="text" name="word" value={formState.word} onChange={handleFormChange} />
          </label>
        </div>
        <input type="submit" value="Add" />
      </form>

      <div>
        <div className="currentWord">{currentWord}</div>
      </div>
      <div>
        <div className="statusMessage correct">`{currentWord}` guessed by Mesterember!</div>
      </div>
      <div>
        <div className="statusMessage info">Lejárt az idő! Következő játékos: Tetőszedő</div>
      </div>
      <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
      <Timer></Timer>
      <button>Draw</button>
      <button>Return to Hat</button>
    </div>
  );
}

export default Hat;
