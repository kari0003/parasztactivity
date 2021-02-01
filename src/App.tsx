import { useEffect, useReducer } from 'react';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import './App.css';
import Header from './components/Header';
import io from 'socket.io-client';
import JoinForm from './components/JoinForm';

//const SOCKET_SERVER = 'http://localhost:3005';
const SOCKET_SERVER = 'https://parasztactivity.herokuapp.com';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  const initialState: State = {
    state,
    dispatch,
  };

  useEffect(() => {
    const socket = io.connect(SOCKET_SERVER);
    socket.on('connect', () => {
      console.log('connected for dogs shake', socket.id);
    });
  }, []);

  return (
    <AppContext.Provider value={initialState}>
      <div className="background container">
        <Header></Header>
        <div className="wrapper">
          <JoinForm></JoinForm>
          <h1>Parasztactivity</h1>
          <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="App-logo" alt="logo" />
          <p>Coming Soon</p>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
