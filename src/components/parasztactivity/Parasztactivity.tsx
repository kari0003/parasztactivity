import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';
import { useParasztActivity } from '../../state/parasztactivity/parasztactivity.context';
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
  const state = useParasztActivity();

  const gameContent = state.gameStarted ? (
    state.currentPlayer === appState.profile?.id ? (
      <Hat></Hat>
    ) : (
      <Guesser></Guesser>
    )
  ) : state.roundOver ? (
    <RoundOver></RoundOver>
  ) : (
    <Setup></Setup>
  );

  return (
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
  );
}

export default Parasztactivity;
