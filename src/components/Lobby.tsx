import Parasztactivity from './parasztactivity/Parasztactivity';

function Lobby(): JSX.Element {
  const game = 'parasztactivity';

  switch (game) {
    case 'parasztactivity':
      return <Parasztactivity></Parasztactivity>;
    default:
      return (
        <div className="wrapper">
          <h1>Game Not Found!</h1>
        </div>
      );
  }
}

export default Lobby;
