import { useEffect, useState } from 'react';
import { useParasztactivityEmitter } from '../../socketio/parasztactivity.handler';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Hat(): JSX.Element {
  const state = useParasztactivity();
  const currentWord = state.currentWord;

  const [{ animation, word }, setAnimationState] = useState<{ animation: string; word: string | null }>({
    animation: '',
    word: null,
  });

  useEffect(() => {
    setAnimationState({ animation, word: currentWord });
  }, [state.currentWord]);

  const handler = useParasztactivityEmitter();

  const handleDraw = () => {
    handler.drawWord();
    setAnimationState({ animation: 'backInUp', word });
  };

  const handleReturn = () => {
    handler.putBackWord();
    setAnimationState({ animation: 'backOutDown', word });
  };

  const handleAnimationEnd = () => {
    setAnimationState({ animation, word: currentWord });
  };

  const currentWordComponent = () => {
    return (
      <div className={animation ? `animate__animated animate__${animation}` : ''} onAnimationEnd={handleAnimationEnd}>
        <div className="currentWord">{currentWord}</div>
      </div>
    );
  };

  return (
    <div>
      {currentWordComponent()}
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <Timer></Timer>
          <button onClick={handleDraw}>Draw</button>
          <button onClick={handleReturn}>Return to Hat</button>
        </div>
      </div>
    </div>
  );
}

export default Hat;
