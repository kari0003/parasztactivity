import { FormEvent, useState } from 'react';
import { useSingletonParasztactivityHandler } from '../../state/parasztactivity/parasztactivity.handler';

function Setup({ roomId }: { roomId: number }): JSX.Element {
  const [formState, setState] = useState({ word: '' });

  const parasztactivityHandler = useSingletonParasztactivityHandler(roomId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    parasztactivityHandler.addWord(formState.word);
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <div>
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

      <button>Ready</button>
    </div>
  );
}

export default Setup;
