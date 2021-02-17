import Message from './Message';

function Chat(): JSX.Element {
  const messages = [{ name: 'ASdf1', message: 'asdfas' }];

  return (
    <div className="wrapper">
      <div className="messageScroll">
        {messages.map((message) => {
          return <Message name={message.name} message={message.message}></Message>;
        })}
      </div>
      <div className="chatSend">
        <input type="text" name="chatMessage" id="chatMessage" />
        <button>Send message</button>
      </div>
    </div>
  );
}

export default Chat;
