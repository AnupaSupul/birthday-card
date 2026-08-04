import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const starContent = [
  "You're the brightest! 🌸",
  "A funny memory unlocked: That time we got lost! 😂",
  "Wish: Infinite pizza for you! 🍕",
  "💖💖💖",
  "Another wish: May your phone battery never die! 🔋",
  "You deserve all the cake today! 🎂",
  "Best friend award: UNLOCKED 🏆",
  "Secret message: You're amazing! 🦋",
  "Birthday hug incoming! 🤗",
];

const fallingEmojis = ['🌸', '💖', '🦋', '🌷', '🌼', '💐', '🎀', '✨', '🌺', '💕'];

function FallingItem({ onCatch, index }) {
  // Compute all random values ONCE at mount via useMemo
  const config = useMemo(() => ({
    x: Math.random() * 80 + 10,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 6,
    emoji: fallingEmojis[index % fallingEmojis.length],
    size: Math.random() > 0.5 ? 'text-4xl' : 'text-3xl',
  }), [index]);

  return (
    <motion.div
      initial={{ y: -80, x: `${config.x}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: '110vh', 
        opacity: [0, 0.9, 0.9, 0],
        rotate: [0, 15, -15, 10, -10, 0],
      }}
      transition={{ 
        duration: config.duration, 
        delay: config.delay, 
        repeat: Infinity,
        ease: "linear",
      }}
      className={`absolute cursor-pointer z-10 ${config.size} hover:scale-150 transition-transform select-none`}
      onClick={(e) => {
        e.stopPropagation();
        onCatch(e.clientX, e.clientY);
      }}
    >
      {config.emoji}
    </motion.div>
  );
}

export default function Page11_CatchStars() {
  const [caughtContent, setCaughtContent] = useState(null);

  const handleCatch = (x, y) => {
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#ffb6c1', '#ff69b4', '#ffc0cb', '#ffd1dc', '#ffffff']
    });

    const content = starContent[Math.floor(Math.random() * starContent.length)];
    setCaughtContent(content);

    setTimeout(() => {
      setCaughtContent(null);
    }, 3000);
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-transparent py-20 flex flex-col items-center">
      
      <div className="z-20 text-center pointer-events-none mt-10 px-4">
        <h2 className="text-4xl md:text-5xl font-pacifico font-bold text-[#ff8da1] mb-4 drop-shadow-sm">
          Catch a Flower 🌸
        </h2>
        <p className="text-xl text-gray-500 font-nunito font-semibold">Tap a falling flower or heart to reveal a surprise!</p>
      </div>

      {/* Falling Items */}
      {[...Array(20)].map((_, i) => (
        <FallingItem key={i} index={i} onCatch={handleCatch} />
      ))}

      {/* Popup Content */}
      <AnimatePresence>
        {caughtContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 glass-card p-8 text-center min-w-[300px] border border-pink-200"
          >
            <p className="text-2xl font-nunito font-bold text-pink-500">{caughtContent}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

