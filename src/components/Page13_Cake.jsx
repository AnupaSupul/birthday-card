import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Page13_Cake() {
  const [blownOut, setBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleBlowCandles = () => {
    setBlownOut(true);
    
    // Play cheer sound (Using a local sound URL)
    const cheer = new Audio('/audio/bgm.mp3');
    cheer.volume = 0.5;
    cheer.play().catch(e => console.log(e));

    // Wait 2 seconds before showing message
    setTimeout(() => {
      setShowMessage(true);
    }, 2000);

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

  // Helper arrays for background decorations
  const topDecorations = ["🌸", "🎀", "🦋", "✨", "🌺"];
  const bottomDecorations = ["🎁", "🎈", "🌷", "✨", "💝"];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden bg-gradient-to-b from-pink-50/50 via-white/50 to-pink-100/50">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Light Rays */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[150%] bg-gradient-to-b from-pink-200/40 to-transparent rotate-12 blur-3xl transform-gpu"></div>
        <div className="absolute top-[-10%] right-[20%] w-[30%] h-[120%] bg-gradient-to-b from-purple-200/40 to-transparent -rotate-12 blur-3xl transform-gpu"></div>
      </div>

      {/* Blurred Floating Shapes for Depth */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-64 h-64 bg-pink-300/20 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-purple-300/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Subtle Corner Decorations (15-25% opacity) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className="absolute text-2xl md:text-4xl"
            style={{ 
              top: `${Math.random() * 25}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          >
            {topDecorations[i % topDecorations.length]}
          </motion.div>
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className="absolute text-3xl md:text-5xl"
            style={{ 
              bottom: `${Math.random() * 25}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          >
            {bottomDecorations[i % bottomDecorations.length]}
          </motion.div>
        ))}
      </div>

      {/* --- WISH EFFECTS (After Blowing Candles) --- */}
      <AnimatePresence>
        {blownOut && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Rising Balloons */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`balloon-${i}`}
                initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 }}
                animate={{ y: '-20vh', opacity: [0, 0.8, 0.8, 0], scale: 1 }}
                transition={{ duration: 8 + Math.random() * 4, ease: "linear", delay: Math.random() * 2 }}
                className="absolute text-4xl md:text-6xl"
              >
                🎈
              </motion.div>
            ))}
            
            {/* Drifting Petals & Butterflies */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                initial={{ y: '-10vh', x: `${Math.random() * 100}vw`, opacity: 0, rotate: 0 }}
                animate={{ 
                  y: '100vh', 
                  x: [`${Math.random() * 100}vw`, `${(Math.random() - 0.5) * 50 + 50}vw`],
                  opacity: [0, 0.6, 0.6, 0],
                  rotate: 360
                }}
                transition={{ duration: 10 + Math.random() * 5, ease: "linear", delay: Math.random() * 3 }}
                className="absolute text-2xl"
              >
                {i % 3 === 0 ? '🦋' : '🌸'}
              </motion.div>
            ))}

            {/* Glowing Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`glow-${i}`}
                initial={{ y: '50vh', x: '50vw', opacity: 0, scale: 0 }}
                animate={{ 
                  y: `${(Math.random() - 0.5) * 100}vh`, 
                  x: `${(Math.random() - 0.5) * 100}vw`, 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{ duration: 4 + Math.random() * 3, ease: "easeOut", delay: Math.random() * 1 }}
                className="absolute w-3 h-3 bg-yellow-100 rounded-full blur-[2px] shadow-[0_0_15px_#fef08a]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* --- CONTENT --- */}
      <div className="text-center mb-16 relative z-10">
        <div className="absolute -top-10 -left-8 text-5xl animate-float opacity-80 pointer-events-none">🎂</div>
        <div className="absolute -top-4 -right-12 text-4xl animate-float opacity-60 pointer-events-none" style={{ animationDelay: '1s' }}>✨</div>
        <h2 className="text-4xl md:text-6xl font-pacifico font-bold text-[#ff8da1] mb-4 drop-shadow-md">
          Make a Wish!
        </h2>
      </div>

      {/* SUCCESS MESSAGE */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[20%] md:top-[15%] z-30 px-4 text-center pointer-events-none w-full flex justify-center"
          >
            <div className="glass-card inline-block px-8 py-6 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(255,182,193,0.3)] border border-white/60 rounded-3xl">
              <p className="text-2xl md:text-4xl font-pacifico text-pink-500 drop-shadow-sm leading-relaxed">
                May every wish you make<br />this year come true. 💖
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAKE AREA */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center z-10 group mt-4"
      >
        {/* Soft Glow Behind Cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-[60px] pointer-events-none transition-colors duration-1000 group-hover:bg-pink-300/40"></div>

        {/* Floating magic particles around cake */}
        <div className="absolute inset-[-50px] pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-yellow-300 text-xl"
              style={{ 
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 80}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Premium CSS Cake */}
        <div className="relative mt-8">
          {/* Candles */}
          <div className="flex justify-center gap-6 mb-[-15px] z-30 relative">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative w-5 h-20 bg-gradient-to-r from-pink-100 via-white to-pink-200 rounded-full shadow-sm border border-pink-100">
                {/* Diagonal stripes on candle */}
                <div className="absolute inset-0 overflow-hidden rounded-full opacity-40">
                  <div className="w-full h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#f472b6_5px,#f472b6_10px)] -translate-y-4"></div>
                </div>
                {/* Flame */}
                {!blownOut && (
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: [1, 1.2, 0.9, 1.1, 1],
                      rotate: [0, -3, 3, -1, 1, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-yellow-200 to-orange-500 rounded-full blur-[1px] shadow-[0_0_20px_#f97316]"
                    style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%', borderBottomLeftRadius: '30%', borderBottomRightRadius: '30%' }}
                  >
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full opacity-80" />
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
          <div className="w-52 h-24 bg-gradient-to-r from-pink-300 via-pink-100 to-pink-300 rounded-t-2xl relative z-20 mx-auto shadow-[-5px_0_15px_rgba(0,0,0,0.05)_inset,5px_0_15px_rgba(255,255,255,0.5)_inset]">
            {/* Frosting base */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-t-2xl z-10 shadow-sm"></div>
            {/* Drips */}
            <div className="absolute top-4 left-0 w-full flex justify-between px-1.5 z-10">
                <div className="w-5 h-10 bg-white rounded-b-full shadow-sm"></div>
                <div className="w-6 h-14 bg-white rounded-b-full shadow-sm mt-1"></div>
                <div className="w-5 h-7 bg-white rounded-b-full shadow-sm mt-2"></div>
                <div className="w-7 h-16 bg-white rounded-b-full shadow-sm"></div>
                <div className="w-5 h-9 bg-white rounded-b-full shadow-sm mt-1"></div>
                <div className="w-6 h-12 bg-white rounded-b-full shadow-sm"></div>
                <div className="w-5 h-8 bg-white rounded-b-full shadow-sm mt-2"></div>
            </div>
            {/* Pearls at bottom */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1 z-30">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="w-4 h-4 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-pink-50 text-[10px] flex items-center justify-center text-pink-200">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                 </div>
               ))}
            </div>
          </div>
          
          {/* Middle Tier */}
          <div className="w-72 h-32 bg-gradient-to-r from-white via-pink-50 to-pink-100 relative z-10 mx-auto shadow-[-5px_0_15px_rgba(0,0,0,0.05)_inset,5px_0_15px_rgba(255,255,255,0.5)_inset]">
            {/* Frosting pattern */}
            <div className="absolute top-4 w-full flex justify-around px-4 opacity-50">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-8 h-8 rounded-full border-b-4 border-pink-300"></div>
               ))}
            </div>
            {/* Gold accents */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-10 opacity-90 -translate-y-1/2">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="text-yellow-400 text-lg drop-shadow-sm">✨</div>
               ))}
            </div>
            {/* Bottom piped border */}
            <div className="absolute -bottom-2.5 left-0 right-0 flex justify-center gap-0.5 z-30">
               {[...Array(16)].map((_, i) => (
                 <div key={i} className="w-5 h-5 bg-pink-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-pink-300"></div>
               ))}
            </div>
          </div>
          
          {/* Bottom Tier */}
          <div className="w-[22rem] h-40 bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 rounded-b-xl relative z-0 mx-auto shadow-[-5px_0_20px_rgba(0,0,0,0.1)_inset,5px_0_20px_rgba(255,255,255,0.4)_inset]">
            {/* Sprinkles on the tier */}
            <div className="absolute inset-0 overflow-hidden rounded-b-xl opacity-80">
                <div className="absolute top-6 left-12 w-4 h-1.5 bg-white rounded-full rotate-45 shadow-sm"></div>
                <div className="absolute top-16 left-24 w-4 h-1.5 bg-yellow-200 rounded-full -rotate-12 shadow-sm"></div>
                <div className="absolute top-10 right-16 w-4 h-1.5 bg-purple-200 rounded-full rotate-90 shadow-sm"></div>
                <div className="absolute bottom-16 right-24 w-4 h-1.5 bg-white rounded-full rotate-12 shadow-sm"></div>
                <div className="absolute bottom-10 left-32 w-4 h-1.5 bg-yellow-200 rounded-full -rotate-45 shadow-sm"></div>
                <div className="absolute top-20 right-32 w-4 h-1.5 bg-pink-100 rounded-full rotate-[60deg] shadow-sm"></div>
            </div>

            {/* Flowers in the center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center gap-12 text-2xl opacity-90 drop-shadow-md">
                🌸 🌸 🌸 🌸
            </div>

            {/* Bottom piped border */}
            <div className="absolute -bottom-3 left-0 right-0 flex justify-center gap-0 z-30">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className="w-6 h-6 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center">
                   <div className="w-2 h-2 bg-pink-100 rounded-full"></div>
                 </div>
               ))}
            </div>
            
            {/* Plate shadow underneath */}
            <div className="absolute -bottom-8 w-[32rem] left-1/2 -translate-x-1/2 h-14 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent rounded-[50%] -z-10 blur-md"></div>
            
            {/* Premium Plate */}
            <div className="absolute -bottom-6 w-[28rem] left-1/2 -translate-x-1/2 h-12 bg-gradient-to-b from-white to-gray-200 rounded-[50%] -z-10 shadow-xl border border-gray-300">
                {/* Plate inner rim */}
                <div className="absolute top-1.5 left-3 right-3 bottom-1.5 rounded-[50%] border border-gray-300 opacity-60"></div>
                {/* Inner shadow */}
                <div className="absolute inset-0 rounded-[50%] shadow-[inset_0_-2px_10px_rgba(0,0,0,0.05)]"></div>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: blownOut ? 1 : 1.05 }}
          whileTap={{ scale: blownOut ? 1 : 0.95 }}
          onClick={handleBlowCandles}
          disabled={blownOut}
          animate={!blownOut ? {
            y: [0, -5, 0],
            boxShadow: [
              "0px 10px 20px rgba(255, 182, 193, 0.4)",
              "0px 15px 30px rgba(255, 182, 193, 0.6)",
              "0px 10px 20px rgba(255, 182, 193, 0.4)"
            ]
          } : {}}
          transition={!blownOut ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
          className={`mt-24 px-12 py-5 text-xl md:text-2xl transition-all z-10 ${
            blownOut 
              ? 'glass-card bg-white/40 text-pink-400 cursor-not-allowed rounded-full font-pacifico border border-white/50 shadow-sm'
              : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-nunito font-bold border-2 border-white/50 cursor-pointer overflow-hidden relative group'
          }`}
        >
          {/* Glassmorphism shine effect on button */}
          {!blownOut && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          )}
          <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
            {blownOut ? "Wishes Made! ✨" : "Blow Candles 🌬️"}
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}

