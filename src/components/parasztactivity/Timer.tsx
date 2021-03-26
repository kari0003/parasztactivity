import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';

function Timer(): JSX.Element {
  const { currentTurnStart } = useParasztActivity();

  const timeElapsed = Date.now() - new Date(currentTurnStart || '2021-03-26 09:03').getTime();

  const elapsedSeconds = Math.floor(timeElapsed / 1000);

  return (
    <div>
      {Math.floor(elapsedSeconds / 60)} : {elapsedSeconds % 60}
    </div>
  );
}

export default Timer;
