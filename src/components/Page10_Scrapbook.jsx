import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import scrapbookPhotos from '../data/photos-page10-scrapbook.json';

const stickers = ["🌸", "⭐", "💖", "✨", "🎀", "🦋"];
const notes = [
  "Remember this day? 🥹",
  "We look so chaotic here lol",
  "Best day ever! ☀️",
  "Take me back! ✈️"
];

// Generate scrapbook pages grouping 2 photos per page
const pages = [];
for (let i = 0; i < Math.min(4, Math.ceil(scrapbookPhotos.length / 2)); i++) {
  pages.push({
    id: i,
    photos: [scrapbookPhotos[i*2 % scrapbookPhotos.length], scrapbookPhotos[(i*2 + 1) % scrapbookPhotos.length]],
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
    <section className="min-h-screen flex items-center justify-center relative py-20 px-4 bg-transparent text-[#4a4a4a]">
      
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffb6c1 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-4xl w-full z-10 relative">
        <h2 className="text-4xl md:text-5xl font-pacifico font-bold text-center mb-12 text-[#ff8da1] drop-shadow-sm">
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
              className="absolute inset-0 bg-white rounded-r-3xl shadow-[20px_20px_60px_rgba(255,182,193,0.3)] border-2 border-pink-100 p-8 md:p-12 origin-left flex flex-col md:flex-row gap-8"
            >
              {/* Spine of the book */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-pink-100 shadow-inner border-r border-pink-200"></div>

              {/* Page Content */}
              <div className="ml-4 w-full h-full relative flex flex-col justify-between">
                
                <div className="text-4xl absolute -top-4 -right-4 rotate-12">{pages[currentPage].sticker1}</div>
                <div className="text-4xl absolute bottom-10 left-10 -rotate-12">{pages[currentPage].sticker2}</div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center h-full">
                  {pages[currentPage].photos.map((photo, idx) => (
                    <div key={idx} className={`relative p-3 bg-white shadow-lg ${idx % 2 === 0 ? 'rotate-3' : '-rotate-6'} hover:rotate-0 transition-transform`}>
                      {/* Tape */}
                      <div className="cute-tape"></div>
                      <img src={photo.optimized} alt="Scrapbook memory" className="w-48 h-48 md:w-64 md:h-64 object-cover sepia-[0.2]" loading="lazy" onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7)'; e.target.src = ''; }} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center z-10">
                  <p className="font-pacifico text-3xl md:text-4xl text-gray-700 rotate-[-2deg]">
                    {pages[currentPage].note}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-8 mt-12 items-center">
          <button onClick={prevPage} className="btn-cute px-6 py-2 shadow hover:shadow-lg transition-all">
            &larr; Previous
          </button>
          <span className="font-nunito font-bold text-gray-500 flex items-center bg-white px-4 py-2 rounded-full border border-pink-100 shadow-sm">
            Page {currentPage + 1} of {pages.length}
          </span>
          <button onClick={nextPage} className="btn-cute px-6 py-2 shadow hover:shadow-lg transition-all">
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
