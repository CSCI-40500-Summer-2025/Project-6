
import './App.css';

function App() 
{
  return (
    <div className = "App">
      <header className = "App-header">
        <div className = "leftHeader">

          <button id = "refreshButton" onClick = {() => window.location.reload(false)}>PlatformMatch</button>
        </div>
        <div className = "rightHeader"> 
          <h3>About</h3>
          <h3>Features</h3>
          <h3>Share</h3>
        </div>
      </header>
    </div>
  );
}


export default App;