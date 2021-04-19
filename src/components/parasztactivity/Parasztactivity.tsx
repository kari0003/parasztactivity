import { useApp } from '../../state/app.context';
import Chat from '../chat/Chat';
import GameOver from './GameOver';
import Guesser from './Guesser';
import Hat from './Hat';
import Leaderboard from './Leaderboard';
import './Parasztactivity.css';
import RoundOver from './RoundOver';
import Setup from './Setup';
import Status from './Status';
import TurnOver from './TurnOver';

function Parasztactivity(): JSX.Element {
  const { state } = useApp();
  const gameState = state.game;

  const gameContent = !gameState.gameOver ? (
    gameState.isGameStarted ? (
      gameState.isRoundInProgress ? (
        gameState.isTurnInProgress ? (
          gameState.currentPlayer === state.profile?.id ? (
            <Hat></Hat>
          ) : (
            <Guesser></Guesser>
          )
        ) : (
          <TurnOver></TurnOver>
        )
      ) : (
        <RoundOver></RoundOver>
      )
    ) : (
      <Setup></Setup>
    )
  ) : (
    <GameOver></GameOver>
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
