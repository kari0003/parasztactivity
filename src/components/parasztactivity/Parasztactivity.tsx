import { useEffect, useReducer } from 'react';
import { useApp } from '../../state/app.context';
import { initialState, ParasztActivityContext, reducer } from '../../state/parasztactivity/parasztactivity.context';
import { useSingletonParasztactivityHandler } from '../../state/parasztactivity/parasztactivity.handler';
import Chat from '../chat/Chat';
import Guesser from './Guesser';
import Hat from './Hat';
import Leaderboard from './Leaderboard';
import './Parasztactivity.css';
import RoundOver from './RoundOver';
import Setup from './Setup';
import Status from './Status';

function Parasztactivity(): JSX.Element {
  const { state: appState } = useApp();
  const [state] = useReducer(reducer, { ...initialState, roomId: appState.room?.id || -1 });

  const handler = useSingletonParasztactivityHandler(appState.room?.id);

  useEffect(() => {
    console.log('Init effect called');
    handler.init();
    handler.getState();
  }, [appState.room?.id, handler]);

  const gameContent = state.gameStarted ? (
    state.currentPlayer === appState.profile?.id ? (
      <Hat></Hat>
    ) : (
      <Guesser></Guesser>
    )
  ) : state.roundOver ? (
    <RoundOver></RoundOver>
  ) : (
    <Setup roomId={state.roomId}></Setup>
  );

  return (
    <ParasztActivityContext.Provider value={initialState}>
      <div className="wrapper parasztactivityContainer">
        <div className="game">
          <div>{gameContent}</div>
          <div className="statusOverlay">
            <Status></Status>
          </div>
        </div>
        <div className="social">
          <div className="chat">
            <Chat></Chat>
          </div>
          <div className="leaderboard">
            <Leaderboard></Leaderboard>
          </div>
        </div>
      </div>
    </ParasztActivityContext.Provider>
  );
}

export default Parasztactivity;
