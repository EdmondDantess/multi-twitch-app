import './App.css';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import Main from '../components/Main/Main';

function App() {
  return (
    <div className="App">
      <Main />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
