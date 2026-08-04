import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  { title: "Best Laugh", icon: "😂", desc: "For always laughing at the worst times." },
  { title: "Professional Food Stealer", icon: "🍕", desc: "No fry is safe when you're around." },
  { title: "Professional Troublemaker", icon: "🌪️", desc: "A walking natural disaster." },
  { title: "Certified Drama Queen", icon: "🎭", desc: "Oscar-worthy performances daily." },
  { title: "Selfie Queen", icon: "📸", desc: "Takes 100 photos, posts 1." },
  { title: "Birthday Queen", icon: "👑", desc: "The ruler of today." }
];

export default function Page8_Awards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20 px-4">
      <div className="text-center mb-16 z-10 relative">
        <div className="absolute -top-10 left-10 text-4xl animate-float opacity-70">🌸</div>
        <h2 className="text-4xl md:text-6xl font-pacifico font-bold text-[#ff8da1] drop-shadow-sm mb-4">
          Best Friend Awards 🏆
        </h2>
        <p className="text-xl text-gray-500 font-nunito font-semibold">And the nominees are...</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full z-10 perspective-1000"
      >
        {awards.map((award, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
            className="glass-card p-8 text-center flex flex-col items-center relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="text-6xl mb-6 bg-pink-50 w-24 h-24 rounded-full flex items-center justify-center shadow-inner border border-pink-100">
              {award.icon}
            </div>
            <h3 className="text-2xl font-nunito font-bold mb-2 text-pink-500">{award.title}</h3>
            <p className="text-gray-600 font-medium">{award.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
