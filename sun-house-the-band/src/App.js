import './App.css';
import PlanetMap from './PlanetMap.js';
import Cursor from './Cursor.js';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <BandName />
      <PlanetMap />
      <Routes>
        <Route path="/" element={<>Hi</>}/>
        <Route path="/grill-info" element={<>What</>}/>
        <Route path="/rent-grill" element={<>Nah That is wild</>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

function BandName() {
  return (
    <h1>Sun House</h1>
  );
}

export default App;
