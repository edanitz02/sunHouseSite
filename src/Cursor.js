// import React, { useEffect, useRef } from 'react';
// import cursorImg from './planets/download.jpeg';
// import fireImg from './planets/fire.png';
// import './Cursor.css';

// function RotatingCursor() {
//   const cursorRef = useRef(null);
//   const fireRef = useRef(null);
//   const lastPos = useRef({ x: 0, y: 0 });
//   const lastUpdate = useRef(Date.now());

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const cursor = cursorRef.current;
//       const fire = fireRef.current;
//       if (!cursor || !fire) return;

//       const now = Date.now();
//       const dt = now - lastUpdate.current;

//       const dx = e.clientX - lastPos.current.x;
//       const dy = e.clientY - lastPos.current.y;
//       const dist = Math.sqrt(dx * dx + dy * dy);

//       // Only update rotation and fire if moved and enough time has passed
//       if (dist > 1 && dt > 16) {
//         const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//         // Move and rotate cursor
//         cursor.style.left = `${e.clientX}px`;
//         cursor.style.top = `${e.clientY}px`;
//         cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

//         // Move and scale fire
//         fire.style.left = `${e.clientX}px`;
//         fire.style.top = `${e.clientY}px`;
//         fire.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${Math.min(dist / 10, 2)})`;
//         fire.style.opacity = 1;

//         lastPos.current = { x: e.clientX, y: e.clientY };
//         lastUpdate.current = now;
//       } else if (dist <= 1) {
//         fire.style.opacity = 0;
//       }
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     return () => document.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <>
//       <img ref={fireRef} src={fireImg} className="fire-cursor" alt="fire" />
//       <img ref={cursorRef} src={cursorImg} className="custom-cursor" alt="cursor" />
//     </>
//   );
// }

// export default RotatingCursor;


import React, { useEffect, useRef } from 'react';
import cursorImg from './planets/download.jpeg';
import fireImg from './planets/fire.png';
import './Cursor.css';

function RotatingCursor() {
  const cursorRef = useRef(null);
  const fireRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      const fire = fireRef.current;
      if (!cursor || !fire) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        const angle = Math.atan2(dy, dx);
        const deg = angle * (180 / Math.PI);

        // Place the ship
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;

        // Offset fire position behind the ship
        const fireOffset = 30; // distance behind the ship
        const fireX = e.clientX - Math.cos(angle) * fireOffset;
        const fireY = e.clientY - Math.sin(angle) * fireOffset;

        // Scale fire based on speed/distance
        const fireScale = Math.min(dist / 8, 2.5); // cap growth

        fire.style.left = `${fireX}px`;
        fire.style.top = `${fireY}px`;
        fire.style.transform = `translate(-50%, -50%) rotate(${deg}deg) scale(${fireScale})`;
        fire.style.opacity = 1;

        lastPos.current = { x: e.clientX, y: e.clientY };
      } else {
        fire.style.opacity = 0;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <img ref={fireRef} src={fireImg} className="fire-cursor" alt="fire" />
      <img ref={cursorRef} src={cursorImg} className="custom-cursor" alt="cursor" />
    </>
  );
}

export default RotatingCursor;
