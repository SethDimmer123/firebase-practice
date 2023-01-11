import './App.css';
import { auth } from './firebase/init';

function App() {
  function register() {
    console.log('register')
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
    </div>
  );
}

export default App;
