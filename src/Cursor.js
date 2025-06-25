import React, { useEffect, useRef } from 'react';
import cursorImg from './planets/rocketship.webp';
import fireImg from './planets/fire.webp';
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

        // Scale fire based on speed/distance
        const fireScale = Math.min(dist / 8, 3.0); // cap growth

        // Offset fire position behind the ship
        const fireOffset = 10 + 20 * fireScale; // distance behind the ship
        const fireX = e.clientX - Math.cos(angle) * fireOffset;
        const fireY = e.clientY - Math.sin(angle) * fireOffset;

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
