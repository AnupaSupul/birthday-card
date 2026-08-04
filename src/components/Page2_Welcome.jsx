import React from 'react';
import { motion } from 'framer-motion';
// Scroll handled with native scrollIntoView

export default function Page2_Welcome() {

  const handleStart = () => {
    // Smooth scroll to the next section
    const nextSection = document.getElementById('photo-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl opacity-30 animate-float"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 5 + 3 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🌸' : '🎈'}
          </div>
        ))}
      </div>

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="glass-card p-10 md:p-16 max-w-2xl w-full mx-4 text-center z-10 flex flex-col items-center relative"
      >
        <div className="absolute -top-6 -right-6 text-6xl transform rotate-12 animate-sway">🎀</div>
        <div className="absolute -bottom-4 -left-4 text-5xl transform -rotate-12 animate-float">🧸</div>

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-5xl md:text-7xl font-pacifico font-bold mb-4 text-[#ff8da1] drop-shadow-sm"
        >
          Happy Birthday!
        </motion.h1>
        
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-3xl md:text-5xl font-nunito text-gradient font-bold mb-8"
        >
          To one of my favorite people I've ever met. 
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-2xl font-nunito text-gray-500 italic mb-12"
        >
          "Some friends become family without anyone noticing."
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={handleStart}
          className="btn-cute px-10 py-4 text-xl"
        >
          Start the Magic ✨
        </motion.button>
      </motion.div>
    </section>
  );
}
