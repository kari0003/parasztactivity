import { useApp, AppConnection } from '../state/app.context';

const getStatusText = (connection: AppConnection): string => {
  return `${connection.status}: ${connection.message || 'Everything is fine!'}`;
};
function StatusBar(): JSX.Element {
  const {
    state: { connection },
  } = useApp();

  const statusText = getStatusText(connection);
  return <div className={`statusBar ${connection.message ? 'red' : 'green'}`}>{statusText}</div>;
}

export default StatusBar;
