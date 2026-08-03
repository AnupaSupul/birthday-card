import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const starContent = [
  "You're the brightest star! ⭐",
  "A funny memory unlocked: That time we got lost! 😂",
  "Wish: Infinite pizza for you! 🍕",
  "💖💖💖",
  "Another wish: May your phone battery never die! 🔋",
  "Sticker: 🦋"
];

function FallingStar({ onCatch }) {
  const [position] = useState({
    x: Math.random() * 80 + 10, // 10% to 90%
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5 // 5 to 10 seconds
  });

  return (
    <motion.div
      initial={{ y: -100, x: `${position.x}vw`, opacity: 0 }}
      animate={{ y: '120vh', opacity: [0, 1, 1, 0] }}
      transition={{ 
        duration: position.duration, 
        delay: position.delay, 
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute cursor-pointer z-10 text-4xl hover:scale-125 transition-transform"
      onClick={(e) => {
        e.stopPropagation();
        onCatch(e.clientX, e.clientY);
      }}
    >
      ⭐
    </motion.div>
  );
}

export default function Page11_CatchStars() {
  const [caughtContent, setCaughtContent] = useState(null);

  const handleCatch = (x, y) => {
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#fbbf24', '#f59e0b', '#ffffff']
    });

    const content = starContent[Math.floor(Math.random() * starContent.length)];
    setCaughtContent(content);

    setTimeout(() => {
      setCaughtContent(null);
    }, 3000);
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0f0c29] to-[#302b63] py-20 flex flex-col items-center">
      
      <div className="z-20 text-center pointer-events-none mt-10">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-yellow-300 mb-4 drop-shadow-lg">
          Catch a Star
        </h2>
        <p className="text-xl text-gray-300">Tap a falling star to reveal a surprise!</p>
      </div>

      {/* Falling Stars */}
      {[...Array(15)].map((_, i) => (
        <FallingStar key={i} onCatch={handleCatch} />
      ))}

      {/* Popup Content */}
      <AnimatePresence>
        {caughtContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 glass-card p-8 text-center min-w-[300px]"
          >
            <p className="text-2xl font-outfit font-bold text-white">{caughtContent}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
