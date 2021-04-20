import { FormEvent, useState } from 'react';
import { initialAppState, useApp } from '../../state/app.context';
import { parasztactivityHandlerFactory } from '../../socketio/parasztactivity.handler';
import { useSocket } from '../../state/socket';

function Setup(): JSX.Element {
  const {
    state: { game },
  } = useApp();
  const initialFormState = Array(game.settings.maxWordPerPlayer).reduce<Record<string, string>>((state, _, index) => {
    return { ...state, [`word${index}`]: '' };
  }, {});
  const [formState, setState] = useState<Record<string, string>>(initialFormState);
  const socket = useSocket();

  const handler = parasztactivityHandlerFactory(socket);

  const handleSubmitFactory = (index: number) => (event: FormEvent<HTMLFormElement>) => {
    console.log('formState', formState);
    handler.addWord(formState[`word${index}`], game.roomId);
    console.log('word with index added', index);
    event.preventDefault();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleStartGame = () => {
    handler.startGame(game.roomId);
  };

  const getAddWordForm = (index = 0) => {
    return (
      <form onSubmit={handleSubmitFactory(index)}>
        <div>
          <label>
            Add word to Hat:
            <input type="text" name={`word${index}`} value={formState[`word${index}`]} onChange={handleFormChange} />
          </label>
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  };

  const getAddWordForms = (count: number) => {
    const forms = [];
    for (let i = 0; i < count; i++) {
      forms.push(getAddWordForm(i));
    }
    return forms;
  };

  return (
    <div>
      <h1>Set Up</h1>
      {getAddWordForms(game.settings.maxWordPerPlayer)}
      Words in the hat: {game.hatWordCount}
      {!game.isGameStarted ? <button onClick={handleStartGame}>Start Game</button> : <></>}
    </div>
  );
}

export default Setup;
