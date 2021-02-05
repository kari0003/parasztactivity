import { useReducer } from 'react';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import './App.css';
import Header from './components/Header';
import RoomList from './components/RoomList';
import JoinForm from './components/JoinForm';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  const initialState: State = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={initialState}>
      <div className="background container">
        <Header></Header>
        <div className="wrapper">
          <JoinForm></JoinForm>
          <h1>Parasztactivity</h1>
          <img src={`${process.env.PUBLIC_URL}/fedora.png`} className="App-logo" alt="logo" />
          <p>Coming Soon</p>
          <RoomList></RoomList>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
