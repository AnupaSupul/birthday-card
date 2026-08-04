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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -50 }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-4xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}

      <div className="glass-card p-12 max-w-2xl w-full mx-auto text-center z-10 font-nunito relative">
        <div className="absolute -top-8 -left-6 text-6xl transform rotate-12">🦄</div>
        <h2 className="text-3xl md:text-5xl font-pacifico font-bold mb-12 text-[#ff8da1] drop-shadow-sm">
          Friendship Level
        </h2>
        
        <div className="h-10 w-full bg-pink-100 p-1 mb-4 rounded-full relative overflow-hidden shadow-inner border border-pink-200">
          <motion.div 
            className={`h-full rounded-full ${isError ? 'bg-gradient-to-r from-pink-400 to-purple-400' : 'bg-gradient-to-r from-pink-300 to-pink-400'} transition-colors duration-300`}
            style={{ width: `${Math.min(100, (progress / 100))}%` }}
          />
        </div>

        <div className="text-5xl md:text-7xl font-bold mb-8 flex justify-center items-center gap-4">
          <span className={isError ? 'text-pink-500 animate-bounce' : 'text-pink-400'}>
            {progress}%
          </span>
        </div>

        {isError && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl text-purple-500 font-bold tracking-wide font-nunito"
          >
            <span className="block text-5xl mb-4">💕 ERROR 💕</span>
            Too much friendship detected!
          </motion.div>
        )}
      </div>
    </section>
  );
}
