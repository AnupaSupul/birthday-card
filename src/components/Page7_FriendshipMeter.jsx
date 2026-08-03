import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Page7_FriendshipMeter() {
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to 9999
      let current = 0;
      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 200) + 50;
        if (current >= 9999) {
          current = 9999;
          clearInterval(interval);
          setIsError(true);
        }
        setProgress(current);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 px-4 overflow-hidden" ref={ref}>
      
      {/* Background Sparkles when Error */}
      {isError && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-3xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full mx-auto text-center z-10 font-mono">
        <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-12 uppercase tracking-[0.2em] text-pink-400">
          Friendship Level
        </h2>
        
        <div className="h-12 w-full border-4 border-white/20 p-1 mb-4 rounded-md relative overflow-hidden">
          <motion.div 
            className={`h-full ${isError ? 'bg-red-500' : 'bg-green-400'} transition-colors duration-300`}
            style={{ width: `${Math.min(100, (progress / 100))}%` }}
          />
        </div>

        <div className="text-5xl md:text-7xl font-bold mb-8 flex justify-center items-center gap-4">
          <span className={isError ? 'text-red-500 animate-pulse' : 'text-green-400'}>
            {progress}%
          </span>
        </div>

        {isError && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl text-red-400 font-bold uppercase tracking-widest"
          >
            <span className="block text-4xl mb-2">⚠️ SYSTEM ERROR ⚠️</span>
            Too much friendship detected.
          </motion.div>
        )}
      </div>
    </section>
  );
}
