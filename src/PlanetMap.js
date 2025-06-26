import React, { useState } from 'react';
import './PlanetMap.css';
import planet1 from './planets/blue.webp';
import planet2 from './planets/pinkOrb.webp';
import planet3 from './planets/purple.png';
import planet4 from './planets/purpleStripe.webp';
import planet5 from './planets/thinOrb.webp';
import {Sites, Socials, Merch, Games, Archives} from './Planets.js';

const planets = [
  { id: 1, img: planet1, top: '20%', left: '15%', Component: Archives },
  { id: 2, img: planet2, top: '35%', left: '70%', Component: Socials },
  { id: 3, img: planet3, top: '60%', left: '30%', Component: Merch },
  { id: 4, img: planet4, top: '75%', left: '80%', Component: Games },
  { id: 5, img: planet5, top: '15%', left: '47%', Component: Sites }
];

function PlanetMap() {
  const [activePlanet, setActivePlanet] = useState(null);

  return (
    <div className="space-container">
      <h1>Sun House</h1>
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
            {activePlanet.Component && <activePlanet.Component />}
            <button onClick={() => setActivePlanet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanetMap;
