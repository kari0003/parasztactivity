import './App.css';
import AppBody from './Body';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import ContextWrapper from './ContextWrapper';

function App(): JSX.Element {
  return (
    <ContextWrapper>
      <StatusBar></StatusBar>
      <div className="background container">
        <Header></Header>
        <AppBody></AppBody>
      </div>
    </ContextWrapper>
  );
}

export default App;
