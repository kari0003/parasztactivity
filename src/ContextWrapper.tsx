import { useReducer } from 'react';
import App from './App';
import './App.css';
import { AppContext, initialAppState, reducer, State } from './state/app.context';
import { useSocketEventHandler } from './state/socket';

function ContextWrapper(): JSX.Element {
  const existingToken = sessionStorage.getItem('token');
  const existingName = localStorage.getItem('name') || 'Senki';
  const [state, dispatch] = useReducer(reducer, { ...initialAppState, token: existingToken, name: existingName });
  useSocketEventHandler(dispatch);

  const initialState: State = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={initialState}>
      <App></App>
    </AppContext.Provider>
  );
}

export default ContextWrapper;
