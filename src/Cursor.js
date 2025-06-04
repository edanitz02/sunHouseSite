import React, { useEffect, useRef, useState } from 'react';
import cursorImg from './planets/download.jpeg';
import './Cursor.css';

function RotatingCursor() {
  const cursorRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <img ref={cursorRef} src={cursorImg} className="custom-cursor" alt="cursor" />;
}

export default RotatingCursor;
