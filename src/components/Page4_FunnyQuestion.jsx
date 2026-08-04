import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Page4_FunnyQuestion() {
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  // Smooth evasion: when mouse moves near NO button, it runs away
  const handleMouseMove = useCallback((e) => {
    if (answered || noScale <= 0 || !noBtnRef.current || !containerRef.current) return;

    const btnRect = noBtnRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only flee when mouse is within 120px of the button
    if (distance < 120) {
      // Calculate flee direction (opposite of mouse approach)
      const angle = Math.atan2(dy, dx);
      const fleeDistance = 100 + Math.random() * 60;
      
      let newX = -Math.cos(angle) * fleeDistance;
      let newY = -Math.sin(angle) * fleeDistance;

      // Clamp within the card
      const maxX = (containerRect.width / 2) - 80;
      const maxY = 120;
      newX = Math.max(-maxX, Math.min(maxX, noPosition.x + newX));
      newY = Math.max(-maxY, Math.min(maxY, noPosition.y + newY));

      setNoPosition({ x: newX, y: newY });
    }
  }, [answered, noScale, noPosition]);

  const handleNoClick = () => {
    if (noScale <= 0.2) {
      setNoScale(0);
    } else {
      setNoScale(prev => prev - 0.15);
      setYesScale(prev => prev + 0.2);
      // Also flee on click
      const maxX = 150;
      const maxY = 100;
      setNoPosition({ 
        x: Math.floor(Math.random() * maxX * 2) - maxX, 
        y: Math.floor(Math.random() * maxY * 2) - maxY 
      });
    }
  };

  const handleYesClick = () => {
    setAnswered(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#ff69b4', '#ffc0cb', '#ffd1dc']
    });
  };

  return (
    <section 
      className="min-h-[80vh] flex flex-col items-center justify-center relative py-20 overflow-hidden" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-10 max-w-2xl w-full mx-4 text-center z-10 relative"
      >
        <div className="absolute -top-8 -left-4 text-5xl transform -rotate-12 animate-sway">🎂</div>
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-3xl md:text-5xl font-pacifico font-bold mb-8 text-[#ff8da1]">
                Important Birthday Question...
              </h2>
              <p className="text-xl md:text-2xl mb-12 font-nunito font-semibold text-gray-600">
                Will the Birthday Girl treat me to cake? 🍰
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[120px] relative">
                <motion.button
                  whileHover={{ scale: yesScale * 1.1 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  onClick={handleYesClick}
                  style={{ scale: yesScale }}
                  className="btn-cute px-8 py-4 text-xl z-20"
                >
                  YES 😎
                </motion.button>

                {noScale > 0 && (
                  <motion.button
                    ref={noBtnRef}
                    animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onClick={handleNoClick}
                    className="px-8 py-4 bg-white text-gray-400 hover:bg-gray-100 border-2 border-gray-200 rounded-full text-xl font-nunito font-bold shadow-md z-10 transition-colors cursor-pointer"
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
              <h2 className="text-4xl md:text-6xl font-pacifico font-bold text-gradient mb-6 leading-tight">
                I knew you'd make the right decision 😂
              </h2>
              <p className="text-2xl font-nunito text-gray-600 font-bold">Can't wait for the cake! 🍓</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

