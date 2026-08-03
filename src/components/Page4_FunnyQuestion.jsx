import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Page4_FunnyQuestion() {
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleNoHover = () => {
    if (answered) return;
    
    // Evade logic (Mode 1)
    const maxX = 150;
    const maxY = 100;
    const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
    const randomY = Math.floor(Math.random() * maxY * 2) - maxY;
    
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    // Mode 2 logic
    if (noScale <= 0.2) {
      setNoScale(0); // Disappear
    } else {
      setNoScale(prev => prev - 0.2);
      setYesScale(prev => prev + 0.3);
    }
  };

  const handleYesClick = () => {
    setAnswered(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#3b82f6']
    });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center relative py-20 overflow-hidden" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-10 max-w-2xl w-full mx-4 text-center z-10"
      >
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12">
                🎂 Important Birthday Question
              </h2>
              <p className="text-xl md:text-2xl mb-12">
                Will the Birthday Girl treat me to cake? 🍰
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[120px]">
                <motion.button
                  whileHover={{ scale: yesScale * 1.1 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  onClick={handleYesClick}
                  style={{ scale: yesScale }}
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full text-xl font-bold shadow-lg shadow-green-500/30 transition-colors z-20"
                >
                  YES 😎
                </motion.button>

                {noScale > 0 && (
                  <motion.button
                    animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
                    onMouseEnter={handleNoHover}
                    onClick={handleNoClick}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="px-8 py-4 bg-red-500 hover:bg-red-600 rounded-full text-xl font-bold shadow-lg shadow-red-500/30 absolute md:relative z-10"
                    style={{ left: noPosition.x ? 'auto' : undefined }}
                  >
                    NO 😶
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-outfit font-bold text-gradient mb-6">
                I knew you'd make the right decision 😂
              </h2>
              <p className="text-2xl">Can't wait for the cake! 🍰</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
