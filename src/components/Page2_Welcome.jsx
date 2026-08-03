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
      {/* Background Particles layer */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30 animate-float"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 5 + 3 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="glass-card p-10 md:p-16 max-w-2xl w-full mx-4 text-center z-10 flex flex-col items-center"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-5xl md:text-7xl font-outfit font-bold mb-4"
        >
          🎉 Happy Birthday!
        </motion.h1>
        
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-3xl md:text-5xl font-outfit text-gradient font-bold mb-8"
        >
          To My Best Friend
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-2xl font-inter text-gray-200 italic mb-12"
        >
          "Some friends become family without anyone noticing."
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-xl font-semibold shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
        >
          Start the Adventure
        </motion.button>
      </motion.div>
    </section>
  );
}
