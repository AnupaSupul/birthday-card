import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizData = [
  {
    question: "Who takes better selfies?",
    options: ["Me 😎", "Still Me 😎"],
    response: "Obviously. It's the lighting... mostly."
  },
  {
    question: "Who's always late?",
    options: ["You 😂", "Definitely You 😂"],
    response: "I just run on my own timezone! ⏰"
  },
  {
    question: "Who's the funniest?",
    options: ["You", "Okay maybe Me 😏"],
    response: "We are both comedians in our own right."
  }
];

export default function Page6_FriendshipQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  const handleAnswer = () => {
    setShowResponse(true);
    setTimeout(() => {
      setShowResponse(false);
      setCurrentQ((prev) => (prev + 1) % quizData.length);
    }, 2500);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20 px-4">
      <div className="absolute top-1/4 left-10 text-6xl animate-sway opacity-60">🐰</div>
      <div className="absolute bottom-1/4 right-10 text-6xl animate-bounce-slow opacity-60">🍓</div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 md:p-16 max-w-3xl w-full text-center relative overflow-hidden bg-white/40"
      >
        <h2 className="text-3xl font-pacifico text-pink-400 mb-2 drop-shadow-sm">Friendship Quiz</h2>
        
        <div className="h-64 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {!showResponse ? (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-4xl font-nunito font-bold text-gray-700 mb-8">
                  {quizData[currentQ].question}
                </h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  {quizData[currentQ].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAnswer}
                      className="px-6 py-4 bg-white hover:bg-pink-50 border-2 border-pink-200 rounded-xl text-xl font-nunito font-bold text-pink-500 shadow-md transition-colors"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`r-${currentQ}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-full"
              >
                <h3 className="text-3xl md:text-5xl font-pacifico font-bold text-gradient leading-relaxed">
                  {quizData[currentQ].response}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {quizData.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-3 h-3 rounded-full transition-colors ${idx === currentQ ? 'bg-pink-400 scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
