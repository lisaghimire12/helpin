// AnimatedPin.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Test({ color = '#FF6B6B', size = 64 }) {
  const [open, setOpen] = useState(false);
  const pinSize = size;
  const personSize = Math.round(size * 0.45);

  return (
    <div
      style={{ width: pinSize, height: pinSize * 1.6, position: 'relative', cursor: 'pointer' }}
      onClick={() => setOpen(o => !o)}
      aria-label="map-pin"
    >
      {/* PERSON (pops above the pin) */}
      <motion.svg
        viewBox="0 0 24 24"
        width={personSize}
        height={personSize}
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: pinSize * 0.6 }}
        initial={{ y: 8, opacity: 0, scale: 0.8 }}
        animate={{ y: open ? -38 : 8, opacity: open ? 1 : 0, scale: open ? 1.05 : 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 16 }}
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#ffffff"/>
        <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#ffffff"/>
      </motion.svg>

      {/* PIN (teardrop) */}
      <motion.svg
        viewBox="0 0 24 24"
        width={pinSize}
        height={pinSize}
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 0 }}
        initial={{ scale: 1 }}
        animate={{ y: open ? -12 : 0, scale: open ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color} />
        <circle cx="12" cy="9" r="2.6" fill="#fff" />
      </motion.svg>
    </div>
  );
}

export default Test;