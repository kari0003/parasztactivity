import { FormEvent, useState } from 'react';
import { useApp } from '../../state/app.context';
import { useLobbyEmitter } from '../../state/socket.service';
import Message from './Message';
import './Chat.css';

function Chat(): JSX.Element {
  const { state: appState } = useApp();

  const [formState, setState] = useState({ message: '' });

  const socketHandler = useLobbyEmitter();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.message.length <= 0) {
      return;
    }
    const chatMessage = { name: appState.name, message: formState.message };
    setState({
      ...formState,
      message: '',
    });
    socketHandler.sendChatMessage({ roomName: appState.room ? appState.room.name : '', chatMessage });
  };

  return (
    <div className="chatWrapper">
      <div className="messageScroll">
        {appState.chat.messages.map((message, id) => {
          return <Message key={id} name={message.name} message={message.message}></Message>;
        })}
      </div>
      <div className="chatSend">
        <form onSubmit={sendMessageHandler}>
          <input type="text" name="message" value={formState.message} onChange={handleFormChange} />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default Chat;
