import { useApp, AppConnection } from '../state/app.context';

const getStatusText = (connection: AppConnection): string => {
  return `${connection.status}: ${connection.message}`;
};
function StatusBar(): JSX.Element {
  const {
    state: { connection },
  } = useApp();

  const statusText = getStatusText(connection);
  return <div className="statusBar">{statusText}</div>;
}

export default StatusBar;
