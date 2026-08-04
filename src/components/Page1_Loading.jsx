import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Baking the birthday cake...",
  "Wrapping the gifts...",
  "Sprinkling fairy dust...",
  "Gathering the balloons...",
  "Lighting the candles...",
  "3...",
  "2...",
  "1..."
];

export default function Page1_Loading({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 1000); // 1 second per message
      return () => clearTimeout(timeout);
    } else {
      // Small delay before completing
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff0f5] text-[#4a4a4a]">
      {/* Floating magical dust for loading */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#ffb6c1] opacity-40 animate-float"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {index < messages.length && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-pacifico text-center font-semibold text-gradient z-10 drop-shadow-sm"
          >
            {messages[index]}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 w-64 h-2 bg-pink-100 rounded-full overflow-hidden z-10 shadow-inner border border-pink-200">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff9a9e] to-[#fecfef]"
          initial={{ width: "0%" }}
          animate={{ width: `${((index + 1) / messages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
