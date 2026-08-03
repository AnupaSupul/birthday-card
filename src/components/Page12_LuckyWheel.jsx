import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const segments = [
  { icon: '🍕', text: 'Buy everyone pizza', color: '#ef4444' }, // red
  { icon: '🍦', text: 'Ice cream time', color: '#f97316' }, // orange
  { icon: '📸', text: 'Take 20 selfies', color: '#f59e0b' }, // amber
  { icon: '🎬', text: 'Movie Night', color: '#84cc16' }, // lime
  { icon: '☕', text: 'Coffee Treat', color: '#06b6d4' }, // cyan
  { icon: '😂', text: 'Tell your funniest joke', color: '#8b5cf6' }, // violet
];

export default function Page12_LuckyWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);

    // Spin at least 5 times (1800deg) + random angle
    const extraSpins = 5 * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Calculate which segment won
      // The pointer is at the top (0 degrees).
      // If wheel rotates clockwise, we need to find what is at 0 degrees.
      // Normalize rotation
      const normalizedRotation = totalRotation % 360;
      // Since pointer is top, and 0 degree of wheel is top,
      // as wheel rotates clockwise by normalizedRotation, 
      // the point at the top corresponds to (360 - normalizedRotation) on the wheel itself.
      const anglePerSegment = 360 / segments.length;
      const indexAtTop = Math.floor((360 - normalizedRotation + (anglePerSegment/2)) % 360 / anglePerSegment);
      
      const winningSegment = segments[indexAtTop];
      setResult(winningSegment);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: [winningSegment.color, '#ffffff']
      });

    }, 4000); // Wait for spin animation to finish
  };

  // Generate conic gradient for the wheel
  const wheelStyle = {
    background: `conic-gradient(
      ${segments[0].color} 0deg 60deg,
      ${segments[1].color} 60deg 120deg,
      ${segments[2].color} 120deg 180deg,
      ${segments[3].color} 180deg 240deg,
      ${segments[4].color} 240deg 300deg,
      ${segments[5].color} 300deg 360deg
    )`
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-4 text-gradient">
          Lucky Birthday Wheel
        </h2>
        <p className="text-xl text-gray-300">Spin the wheel to decide your fate!</p>
      </div>

      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Pointer */}
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white z-20 filter drop-shadow-md"></div>
        
        {/* Wheel */}
        <motion.div 
          className="w-full h-full rounded-full border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)] overflow-hidden relative"
          style={wheelStyle}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0.85, 0.15, 1] }}
        >
          {segments.map((seg, i) => (
            <div 
              key={i}
              className="absolute top-0 left-0 w-full h-full text-center flex justify-center pt-8"
              style={{ transform: `rotate(${i * 60 + 30}deg)` }}
            >
              <span className="text-4xl filter drop-shadow-md">{seg.icon}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Center button */}
        <button 
          onClick={spinWheel}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full z-10 text-gray-800 font-bold font-outfit shadow-xl hover:scale-105 transition-transform disabled:opacity-80 disabled:hover:scale-100 flex items-center justify-center uppercase tracking-widest text-sm"
        >
          Spin
        </button>
      </div>

      <div className="mt-12 h-24 flex items-center justify-center">
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card px-8 py-4 text-center"
          >
            <h3 className="text-2xl font-outfit font-bold" style={{ color: result.color }}>
              {result.icon} {result.text}
            </h3>
          </motion.div>
        )}
      </div>
    </section>
  );
}
