import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import finalPhotos from '../data/photos-page15-final.json';

export default function Page15_Final() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Automatic fireworks
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ec4899', '#a855f7', '#fbbf24']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ec4899', '#a855f7', '#fbbf24']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isInView]);

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 bg-transparent text-center overflow-hidden" ref={ref}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`lantern-${i}`}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute text-2xl"
          >
            🌸
          </motion.div>
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`butterfly-${i}`}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, ease: "linear" }}
            className="absolute text-2xl"
          >
            🦋
          </motion.div>
        ))}
      </div>

      <div className="z-10 max-w-3xl w-full flex flex-col items-center">
        
        {/* Photo with Crown */}
        <div className="relative mb-12 mt-10">
          {isInView && (
            <motion.div 
              initial={{ y: -200, opacity: 0, rotate: -20 }}
              animate={{ y: -30, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.6, delay: 0.5 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 text-6xl drop-shadow-xl z-20"
            >
              👑
            </motion.div>
          )}
          
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-300 shadow-[0_0_50px_rgba(255,182,193,0.5)] z-10 relative bg-gray-100"
          >
            <img src={finalPhotos[0]?.optimized || ''} alt="Queen" className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7, #60a5fa)'; e.target.src = ''; }} />
          </motion.div>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-3xl md:text-5xl font-pacifico font-bold text-[#ff8da1] mb-8 tracking-wider drop-shadow-sm"
        >
          Official Birthday Queen
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 2 }}
          className="glass-card p-8 md:p-12 mb-12 bg-white/60 shadow-lg"
        >
          <p className="text-xl md:text-2xl font-nunito leading-relaxed text-gray-700 font-bold mb-6">
            Happy Birthday! 🎉
          </p>
          <p className="text-lg md:text-xl font-nunito leading-relaxed text-gray-600 font-semibold mb-6">
            Thank you for being such an amazing friend. I hope this year brings you lots of happiness, unforgettable memories, success, laughter, good health, and countless reasons to smile.
          </p>
          <p className="text-lg md:text-xl font-nunito leading-relaxed font-bold text-pink-500">
            Stay exactly the wonderful person you are.<br/>Have the most amazing birthday ever! 🎂✨
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 4, duration: 1 }}
          className="text-gray-500 text-sm md:text-base space-y-2 font-nunito font-semibold"
        >
          <p>Made with lots of coffee ☕</p>
          <p>Lots of memories 📸</p>
          <p>And a little bit of magic ✨</p>
        </motion.div>

      </div>
    </section>
  );
}
