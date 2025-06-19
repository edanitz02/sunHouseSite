import React, { useState } from 'react';
import './PlanetMap.css';
import planet1 from './planets/blue.webp';
import planet2 from './planets/pinkOrb.jpg';
import planet3 from './planets/purple.png';
import planet4 from './planets/purpleStripe.webp';
import planet5 from './planets/thinOrb.jpeg';

const planets = [
  { id: 1, img: planet1, top: '10%', left: '15%', info: 'This is Planet 1' },
  { id: 2, img: planet2, top: '25%', left: '70%', info: 'This is Planet 2' },
  { id: 3, img: planet3, top: '50%', left: '30%', info: 'This is Planet 3' },
  { id: 4, img: planet4, top: '65%', left: '80%', info: 'This is Planet 4' },
  { id: 5, img: planet5, top: '5%', left: '47%', info: 'This is Planet 5' }
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
