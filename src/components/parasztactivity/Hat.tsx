import { FormEvent, useState } from 'react';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
import { useSocketHandler } from '../../state/socket';

function Header(): JSX.Element {
  const state = useParasztActivity();

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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Join</h1>
        <div>
          <label>
            Add word to Hat:
            <input type="text" name="word" value={formState.word} onChange={handleFormChange} />
          </label>
        </div>
        <input type="submit" value="Add" />
      </form>
      <div>{JSON.stringify(state, null, 2)}</div>
    </div>
  );
}

export default Header;
