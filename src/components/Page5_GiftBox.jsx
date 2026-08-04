import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaGift } from 'react-icons/fa';

const surprises = [
  { type: 'text', content: "You're getting older, but not wiser! 😂" },
  { type: 'emoji', content: "Congratulations! You're now officially at the age where naps count as a hobby. 😴🎉" },
  { type: 'quote', content: "Good friends don't let you do stupid things... alone." },
  { type: 'text', content: "Here is my gift: My amazing presence. You're welcome. 😎" },
  { type: 'emoji', content: "Breaking News 📰: Local pizza stores are preparing for unusually high demand because it's your birthday. 🍕😂" },
];

export default function Page5_GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSurprise, setCurrentSurprise] = useState(null);

  const handleOpen = () => {
    if (isOpen) {
      // Close it to repeat
      setIsOpen(false);
      return;
    }

    const random = surprises[Math.floor(Math.random() * surprises.length)];
    setCurrentSurprise(random);
    setIsOpen(true);

    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#3b82f6', '#fbbf24']
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20">
      <div className="text-center mb-16 z-10 relative">
        <div className="absolute -top-10 -left-10 text-4xl animate-float opacity-70">🌸</div>
        <div className="absolute -bottom-5 -right-5 text-3xl animate-sway opacity-70">🎀</div>
        <h2 className="text-4xl md:text-5xl font-pacifico font-bold text-[#ff8da1] mb-4 drop-shadow-sm">
          A Special Gift Just For You
        </h2>
        <p className="text-xl text-gray-500 font-nunito font-semibold">Tap the box to see what's inside!</p>
      </div>

      <div className="relative z-10 h-64 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1, 
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { rotate: { repeat: Infinity, duration: 2, repeatDelay: 1 } }
              }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              className="cursor-pointer text-pink-500 hover:text-pink-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
            >
              <FaGift size={150} />
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="glass-card p-8 max-w-md text-center relative"
            >
              <div className="absolute -top-4 -right-2 text-3xl rotate-12">✨</div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-3xl md:text-4xl font-pacifico mb-6 text-gray-700 leading-tight"
              >
                {currentSurprise?.content}
              </motion.div>
              
              <button 
                onClick={handleOpen}
                className="text-sm uppercase tracking-widest text-pink-400 font-bold hover:text-pink-600 transition-colors mt-4 bg-pink-50 px-4 py-2 rounded-full border border-pink-100"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
