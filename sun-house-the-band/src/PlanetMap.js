import React, { useState } from 'react';
import './PlanetMap.css';
import planet1 from './planets/blue.webp';
import planet2 from './planets/pinkOrb.jpg';
import planet3 from './planets/purple.png';

const planets = [
  { id: 1, img: planet1, top: '10%', left: '20%', info: 'This is Planet 1' },
  { id: 2, img: planet2, top: '50%', left: '60%', info: 'This is Planet 2' },
  { id: 3, img: planet3, top: '30%', left: '80%', info: 'This is Planet 3' },
];

function PlanetMap() {
  const [activePlanet, setActivePlanet] = useState(null);

  return (
    <div className="space-container">
      {planets.map(planet => (
        <button
          key={planet.id}
          className="planet"
          style={{ top: planet.top, left: planet.left }}
          onClick={() => setActivePlanet(planet)}
        >
          <img src={planet.img} alt={`Planet ${planet.id}`} />
        </button>
      ))}

      {activePlanet && (
        <div className="modal-backdrop" onClick={() => setActivePlanet(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Planet Info</h2>
            <p>{activePlanet.info}</p>
            <button onClick={() => setActivePlanet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanetMap;
