import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Initializing Birthday Surprise...",
  "Loading memories...",
  "Loading laughter...",
  "Loading friendship...",
  "Loading cake...",
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] text-white">
      {/* Starry background for loading */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
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
            className="text-2xl md:text-4xl font-outfit text-center font-semibold text-gradient z-10"
          >
            {messages[index]}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((index + 1) / messages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
