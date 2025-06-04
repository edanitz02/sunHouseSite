import './App.css';
import PlanetMap from './PlanetMap.js';
import Cursor from './Cursor.js';


function App() {
  return (
    <div>
      <Cursor />
      <BandName />
      <PlanetMap />
    </div>
  );
}

function BandName() {
  return (
    <h1>Sun House</h1>
  );
}

export default App;
