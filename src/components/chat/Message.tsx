import { ChatMessage } from '../../interfaces';

function Message({ name, message, type }: { name: string; message: string; type: string }): JSX.Element {
  if (type === 'system') {
    return (
      <div className="messageWrapper">
        <span className="chatMessageSystem">{message}</span>
      </div>
    );
  }
  return (
    <div className="messageWrapper">
      <span className="chatSender">{name}:</span> <span className="chatMessage">{message}</span>
    </div>
  );
}

export default Message;
