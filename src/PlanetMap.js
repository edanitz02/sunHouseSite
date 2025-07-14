import { useState } from 'react';
import './PlanetMap.css';
import planet1 from './planets/blue.webp';
import planet2 from './planets/pinkOrb.webp';
import planet3 from './planets/purple.png';
import planet4 from './planets/purpleStripe.webp';
import planet5 from './planets/thinOrb.webp';
import radioSong from './planets/music/ElevatorMusic.mp3';
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

  function toggleRadio() {
    // fetch dom element
    const audio = document.getElementById('radio');
    // play audio after first click
    if(audio.paused) {
      audio.play();
      audio.loop = true;
      audio.muted = true;
    }
    // toggle mute every time its clicked
    audio.muted = !audio.muted;
  }

  return (
    <div className="space-container">
      <h1>Sun House</h1>
      <audio id='radio'>
        <source src={radioSong} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button className='radio' onClick={toggleRadio}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 72 72">
          <path fill="none" d="M13.223 59.348h45.745V32.776H13.223v26.572z"/>
          <path fill="#9B9B9A" d="m18.74 38.284l36.48.177l.407-2.182H16.624v11.169l2.082.336l.034-9.5z"/>
          <path fill="none" d="M59.968 23.793H12.223v2.828l47.745-.015z"/>
          <circle cx="22.268" cy="13.569" r="1" fill="none"/>
          <circle cx="22.49" cy="41.984" r="2" fill="#3f3f3f"/>
          <g fill="none" stroke="#888" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3">
            <path d="m47.434 27.214l7.785 4.214M24.028 14.546l10.637 5.757"/>
            <circle cx="22.267" cy="13.569" r="2"/>
            <path d="M12.223 31.777h47.745v28.571H12.223zm4.323 20.46h38.572m-38.572 4h38.572"/>
            <path d="M16.624 36.279h38.595v11.504H16.624z"/>
            <circle cx="22.491" cy="41.985" r="2"/>
            <path d="M12.223 26.946v-3.153h47.745v3.153M38.294 41.697v.667m4-.667v.667m4-.667v.667"/>
          </g>
        </svg>
      </button>
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
            <button className="close" onClick={() => setActivePlanet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanetMap;
