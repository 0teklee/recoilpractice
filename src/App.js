import logo from './logo.svg';
import './App.css';
import RecoilTest from './RecoilTest'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>Studying Recoil</h1>
        <RecoilTest/>
      </header>
    </div>
  );
}

export default App;
