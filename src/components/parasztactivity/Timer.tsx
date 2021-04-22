import { useEffect, useState } from 'react';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';

function Timer(): JSX.Element {
  const { currentTurnStart, settings } = useParasztactivity();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTurnStart) {
        const timeElapsed = Date.now() - new Date(currentTurnStart).getTime();
        const elapsedSeconds = Math.floor(timeElapsed / 1000);
        setSeconds(settings.turnLengthSeconds - elapsedSeconds);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="timer">
      {Math.floor(seconds / 60)} : {seconds % 60}
    </div>
  );
}

export default Timer;
