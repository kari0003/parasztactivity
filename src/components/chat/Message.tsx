function Message({ name, message }: { name: string; message: string }): JSX.Element {
  return (
    <div className="messageWrapper">
      <span className="chatSender">{name}:</span> <span className="chatMessage">{message}</span>
    </div>
  );
}

export default Message;
