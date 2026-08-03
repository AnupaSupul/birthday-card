import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Page13_Cake() {
  const [blownOut, setBlownOut] = useState(false);

  const handleBlowCandles = () => {
    setBlownOut(true);
    
    // Play cheer sound (Using a placeholder sound URL)
    const cheer = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=cheer-206745.mp3');
    cheer.volume = 0.5;
    cheer.play().catch(e => console.log(e));

    // Fireworks effect using canvas-confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-pink-400 mb-4">
          Make a Wish!
        </h2>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Simple CSS Cake */}
        <div className="relative">
          {/* Candles */}
          <div className="flex justify-center gap-4 mb-[-10px] z-10 relative">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative w-4 h-16 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-sm">
                {/* Flame */}
                {!blownOut && (
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: [1, 1.2, 0.9, 1.1, 1],
                      rotate: [0, -5, 5, -2, 2, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-500 rounded-full blur-[2px] shadow-[0_0_10px_#f97316]"
                    style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%', borderBottomLeftRadius: '30%', borderBottomRightRadius: '30%' }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-300 rounded-full" />
                  </motion.div>
                )}
                {/* Smoke */}
                {blownOut && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: -50, scale: 2 }}
                    transition={{ duration: 2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full blur-md"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="w-48 h-20 bg-pink-300 rounded-t-xl border-b-4 border-pink-400 relative z-20 mx-auto shadow-inner">
            {/* Frosting drips */}
            <div className="absolute -bottom-2 left-4 w-6 h-6 bg-pink-300 rounded-full"></div>
            <div className="absolute -bottom-3 left-16 w-8 h-8 bg-pink-300 rounded-full"></div>
            <div className="absolute -bottom-2 right-12 w-6 h-6 bg-pink-300 rounded-full"></div>
          </div>
          
          {/* Middle Tier */}
          <div className="w-64 h-24 bg-[#f8ede3] border-b-4 border-orange-200 relative z-10 mx-auto shadow-inner"></div>
          
          {/* Bottom Tier */}
          <div className="w-80 h-28 bg-pink-300 rounded-b-xl border-b-4 border-pink-500 relative z-0 mx-auto shadow-inner flex items-center justify-center">
            {/* Plate */}
            <div className="absolute -bottom-4 w-96 h-8 bg-gray-200 rounded-[50%] -z-10 shadow-2xl"></div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBlowCandles}
          disabled={blownOut}
          className={`mt-16 px-8 py-4 rounded-full text-xl font-bold transition-all shadow-lg ${
            blownOut 
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-purple-500/50 text-white cursor-pointer'
          }`}
        >
          {blownOut ? "Wishes Made! ✨" : "Blow Candles 🌬️"}
        </motion.button>
      </div>
    </section>
  );
}
