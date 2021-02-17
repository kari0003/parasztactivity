function Message({ name, message }: { name: string; message: string }): JSX.Element {
  return (
    <div className="messageWrapper">
      <span>{name}</span> : <span>{message}</span>
    </div>
  );
}

export default Message;
