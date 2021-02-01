import './App.css';
import Header from './components/Header';

function App(): JSX.Element {
  return (
    <div className="background container">
      <Header name={'Kekezovix'} roomId={'asdf'} connected={false}></Header>
      <div className="wrapper">
        <h1>Parasztactivity</h1>
        <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="App-logo" alt="logo" />
        <p>Coming Soon</p>
      </div>
    </div>
  );
}

export default App;
