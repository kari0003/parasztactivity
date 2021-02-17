import { useApp } from '../state/app.context';
import { ConnectionStatus } from '../state/connection';

const getStatusText = (status: ConnectionStatus): string => {
  return `${status}: Status text`;
};
function StatusBar(): JSX.Element {
  const {
    state: {
      connection: { status },
    },
  } = useApp();

  const statusText = getStatusText(status);
  return <div className="statusBar">{statusText}</div>;
}

export default StatusBar;
