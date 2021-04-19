import { FormEvent, useState } from 'react';
import { useApp } from '../../state/app.context';
import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useSocket } from '../../state/socket';

function Setup(): JSX.Element {
  const {
    state: { game },
  } = useApp();
  const [formState, setState] = useState({ word: '' });
  const socket = useSocket();

  const handler = parasztactivityHandlerFactory(socket);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    handler.addWord(formState.word, game.roomId);
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleStartGame = () => {
    handler.startGame(game.roomId);
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
      Words in the hat: {game.hatWordCount}
      {!game.isGameStarted ? <button onClick={handleStartGame}>Start Game</button> : <></>}
    </div>
  );
}

export default Setup;
