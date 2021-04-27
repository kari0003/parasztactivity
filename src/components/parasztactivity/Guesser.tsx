import { Player } from '../../interfaces';
import { useApp } from '../../state/app.context';
import { useParasztactivity } from '../../state/parasztactivity/parasztactivity.context';
import Timer from './Timer';

function Guesser(): JSX.Element {
  const state = useParasztactivity();
  const {
    state: { room },
  } = useApp();
  const currentWord = ' ';

  const currentPlayer = (id: string | null, players: Player[]) => {
    const index = players.findIndex((p) => p.id === id);
    if (!id || index < 0) {
      return 'I dont know who';
    }
    return players[index].name;
  };

  return (
    <div>
      {state.isCurrentWordDrawn ? (
        <div>
          <div className="currentWord">{currentWord}</div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="hatContainer">
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="hatImage" alt="hat" />
        <div className="hatOverlay">
          <Timer></Timer>
          <div>{currentPlayer(state.currentPlayer, room?.players || [])} is describing words.</div>
        </div>
      </div>
    </div>
  );
}

export default Guesser;
