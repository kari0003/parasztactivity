import { useState } from 'react';
import { useApp } from '../../state/app.context';
import { useSocketHandler } from '../../state/socket';
import Message from './Message';

function Chat(): JSX.Element {
  const { state: appState } = useApp();

  const [formState, setState] = useState({ message: '' });

  const socketHandler = useSocketHandler();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...formState, [event.target.name]: event.target.value });
  };

  const sendMessageHandler = () => {
    if (formState.message.length <= 0) {
      return;
    }
    const chatMessage = { name: appState.name, message: formState.message };
    setState({
      ...formState,
      message: '',
    });
    socketHandler.sendChatMessage({ roomName: appState.roomName, chatMessage });
  };

  return (
    <div className="wrapper">
      <div className="messageScroll">
        {appState.chat.messages.map((message, id) => {
          return <Message key={id} name={message.name} message={message.message}></Message>;
        })}
      </div>
      <div className="chatSend">
        <input type="text" name="message" value={formState.message} onChange={handleFormChange} />
        <button onClick={sendMessageHandler}>Send message</button>
      </div>
    </div>
  );
}

export default Chat;
