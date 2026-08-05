import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import introPhotos from '../data/photos-page3-photo-intro.json';

export default function Page3_PhotoIntro() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const animations = [
    { initial: { x: -100, opacity: 0, rotate: -20 }, whileInView: { x: 0, opacity: 1, rotate: -5 } },
    { initial: { y: 100, opacity: 0, scale: 0.8 }, whileInView: { y: 0, opacity: 1, scale: 1, rotate: 5 } },
    { initial: { x: 100, opacity: 0, rotate: 20 }, whileInView: { x: 0, opacity: 1, rotate: -2 } },
    { initial: { y: -100, opacity: 0, scale: 0.5 }, whileInView: { y: 0, opacity: 1, scale: 1, rotate: 8 } },
  ];

  // Pre-compute random hover rotations so they don't change on re-render
  const hoverRotations = introPhotos.map(() => Math.random() * 10 - 5);

  return (
    <section id="photo-intro" ref={sectionRef} className="min-h-screen py-20 flex flex-col items-center justify-center relative">
      <div className="max-w-6xl w-full px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-pacifico font-bold text-[#ff8da1] drop-shadow-sm mb-4">
            Remember when...
          </h2>
          <p className="text-xl text-gray-500 font-nunito max-w-2xl mx-auto">
            Every picture tells a story of our crazy adventures! 🌸
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center justify-center">
          {introPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={animations[index % animations.length].initial}
              whileInView={animations[index % animations.length].whileInView}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{ y }}
              whileHover={{ scale: 1.05, rotate: hoverRotations[index] }}
              className="polaroid-frame relative max-w-sm mx-auto"
            >
              <div className="cute-tape"></div>
              <div className="overflow-hidden bg-gray-100 aspect-square">
                <img 
                  src={photo.optimized} 
                  alt="Memory" 
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7, #60a5fa)'; e.target.style.minHeight = '200px'; e.target.src = ''; }}
                />
              </div>
              <p className="font-pacifico text-gray-700 text-xl text-center mt-4 font-medium px-2">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
