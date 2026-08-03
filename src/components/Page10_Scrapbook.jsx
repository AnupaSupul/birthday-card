import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import photosData from '../data/photos.json';

const stickers = ["🌸", "⭐", "💖", "✨", "🎀", "🦋"];
const notes = [
  "Remember this day? 🥹",
  "We look so chaotic here lol",
  "Best day ever! ☀️",
  "Take me back! ✈️"
];

// Generate scrapbook pages grouping 2 photos per page
const pages = [];
for (let i = 0; i < 4; i++) {
  pages.push({
    id: i,
    photos: [photosData[i*2 % photosData.length], photosData[(i*2 + 1) % photosData.length]],
    note: notes[i % notes.length],
    sticker1: stickers[Math.floor(Math.random() * stickers.length)],
    sticker2: stickers[Math.floor(Math.random() * stickers.length)],
  });
}

export default function Page10_Scrapbook() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % pages.length);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 px-4 bg-[#f8ede3] text-gray-800">
      
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-4xl w-full z-10 relative">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-center mb-12 text-[#8b5a2b] drop-shadow-sm">
          Our Memory Scrapbook
        </h2>

        <div className="relative h-[600px] w-full flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 90, opacity: 0, x: 100 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: -90, opacity: 0, x: -100 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="absolute inset-0 bg-[#fffdf8] rounded-r-3xl shadow-[20px_20px_60px_rgba(0,0,0,0.1)] border border-[#e6d5c3] p-8 md:p-12 origin-left flex flex-col md:flex-row gap-8"
            >
              {/* Spine of the book */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#d4c3b3] shadow-inner border-r border-[#c2b09f]"></div>

              {/* Page Content */}
              <div className="ml-4 w-full h-full relative flex flex-col justify-between">
                
                <div className="text-4xl absolute -top-4 -right-4 rotate-12">{pages[currentPage].sticker1}</div>
                <div className="text-4xl absolute bottom-10 left-10 -rotate-12">{pages[currentPage].sticker2}</div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center h-full">
                  {pages[currentPage].photos.map((photo, idx) => (
                    <div key={idx} className={`relative p-3 bg-white shadow-xl ${idx % 2 === 0 ? 'rotate-3' : '-rotate-6'} hover:rotate-0 transition-transform`}>
                      {/* Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm -rotate-3 z-10 border border-gray-100 shadow-sm"></div>
                      <img src={photo.url} alt="Scrapbook memory" className="w-48 h-48 md:w-64 md:h-64 object-cover sepia-[0.2]" onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7)'; e.target.src = ''; }} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="font-outfit text-2xl md:text-3xl text-[#5c4033] rotate-[-2deg] font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
                    {pages[currentPage].note}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-8 mt-12">
          <button onClick={prevPage} className="px-6 py-2 bg-[#d4c3b3] text-[#5c4033] font-bold rounded shadow hover:bg-[#c2b09f] transition-colors">
            &larr; Previous
          </button>
          <span className="font-outfit font-bold text-[#8b5a2b] flex items-center">
            Page {currentPage + 1} of {pages.length}
          </span>
          <button onClick={nextPage} className="px-6 py-2 bg-[#d4c3b3] text-[#5c4033] font-bold rounded shadow hover:bg-[#c2b09f] transition-colors">
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
