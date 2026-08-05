import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wallPhotosData from '../data/photos-page14-photo-wall.json';

export default function Page14_PhotoWall() {
  const [selected, setSelected] = useState(null);
  
  // Use all photo-wall photos
  const wallPhotos = wallPhotosData;

  return (
    <section className="min-h-screen relative py-20 bg-transparent overflow-hidden">
      
      {/* Fairy Lights string (SVG curve) */}
      <div className="absolute top-32 left-0 w-full h-24 pointer-events-none z-0 opacity-50">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,50 Q25,100 50,50 T100,50" fill="none" stroke="#ffb6c1" strokeWidth="2" />
        </svg>
      </div>

      <div className="text-center mb-24 z-10 relative">
        <div className="absolute -top-10 right-10 text-4xl animate-sway opacity-70">🌸</div>
        <h2 className="text-4xl md:text-5xl font-pacifico font-bold text-[#ff8da1] mb-4 drop-shadow-sm">
          The Wall of Fame
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-12 max-w-6xl mx-auto px-4 relative z-10">
        {wallPhotos.map((photo, i) => (
          <div 
            key={photo.id} 
            className="relative cursor-pointer group"
            onClick={() => setSelected(photo)}
          >
            {/* The Clip */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-gray-400 rounded-t-sm z-20 shadow-md flex justify-center">
               <div className="w-1 h-2 bg-gray-600 rounded-full mt-1"></div>
            </div>

            {/* The Polaroid (Swinging) */}
            <motion.div 
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3 + Math.random(), ease: "easeInOut", delay: Math.random() }}
              style={{ transformOrigin: 'top center' }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              className="polaroid-frame w-40 md:w-56"
            >
              <img src={photo.thumbnail} alt="Memory" className="w-full h-40 md:h-56 object-cover bg-gray-100 pointer-events-none" loading="lazy" onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7)'; e.target.src = ''; }} />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Light Bulbs on the string */}
      <div className="absolute top-[8rem] md:top-[9rem] left-0 w-full flex justify-around pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, delay: Math.random() }}
            className="w-4 h-4 bg-yellow-100 rounded-full blur-[2px] shadow-[0_0_15px_#ffb6c1]"
            style={{ marginTop: i % 2 === 0 ? '10px' : '-10px' }}
          />
        ))}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -10 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.5, y: 100, rotate: 10 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="polaroid-frame max-w-xl w-full"
            >
              <div className="cute-tape"></div>
              <img src={selected.optimized} alt="Enlarged memory" className="w-full max-h-[70vh] object-contain rounded" loading="lazy" onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7)'; e.target.style.minHeight = '200px'; e.target.src = ''; }} />
              <p className="mt-6 text-center font-pacifico text-3xl text-gray-700 font-medium px-4">
                {selected.caption}
              </p>
              <button 
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-400 text-4xl"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
