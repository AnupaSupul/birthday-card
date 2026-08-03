import React from 'react';
import { motion } from 'framer-motion';
import photosData from '../data/photos.json';

export default function Page3_PhotoIntro() {
  const introPhotos = photosData.slice(0, 4);

  const animations = [
    { initial: { x: -100, opacity: 0, rotate: -20 }, whileInView: { x: 0, opacity: 1, rotate: -5 } },
    { initial: { y: 100, opacity: 0, scale: 0.8 }, whileInView: { y: 0, opacity: 1, scale: 1, rotate: 5 } },
    { initial: { x: 100, opacity: 0, rotate: 20 }, whileInView: { x: 0, opacity: 1, rotate: -2 } },
    { initial: { y: -100, opacity: 0, scale: 0.5 }, whileInView: { y: 0, opacity: 1, scale: 1, rotate: 8 } },
  ];

  return (
    <section id="photo-intro" className="min-h-screen py-20 flex flex-col items-center justify-center relative">
      <div className="max-w-6xl w-full px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-outfit font-bold text-center mb-16 text-gradient"
        >
          Let's Revisit Some Memories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center justify-center">
          {introPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={animations[index % animations.length].initial}
              whileInView={animations[index % animations.length].whileInView}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              className="bg-white p-4 pb-12 rounded-lg shadow-2xl mx-auto w-full max-w-sm rotate-1 relative transition-all duration-300"
            >
              {/* Tape effect */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md rotate-3 skew-x-12 z-10"></div>
              
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img 
                  src={photo.url} 
                  alt="Memory" 
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7, #60a5fa)'; e.target.style.minHeight = '200px'; e.target.src = ''; }}
                />
              </div>
              <p className="font-outfit text-gray-800 text-xl text-center mt-6 font-medium px-2">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
