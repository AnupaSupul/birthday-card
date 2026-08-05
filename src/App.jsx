import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically detect any audio file placed in public/audio (just mapping the filenames to avoid Vite warnings)
const audioFiles = import.meta.glob('/public/audio/*.{mp3,wav,ogg,m4a}');


import Page1_Loading from './components/Page1_Loading';
import Page2_Welcome from './components/Page2_Welcome';
import Page3_PhotoIntro from './components/Page3_PhotoIntro';
import Page4_FunnyQuestion from './components/Page4_FunnyQuestion';
import Page5_GiftBox from './components/Page5_GiftBox';
import Page7_FriendshipMeter from './components/Page7_FriendshipMeter';
import Page8_Awards from './components/Page8_Awards';
import Page9_Galaxy from './components/Page9_Galaxy';
import Page10_Scrapbook from './components/Page10_Scrapbook';
import Page11_CatchStars from './components/Page11_CatchStars';
import Page12_LuckyWheel from './components/Page12_LuckyWheel';
import Page13_Cake from './components/Page13_Cake';
import Page14_PhotoWall from './components/Page14_PhotoWall';
import Page15_Final from './components/Page15_Final';

// Floating Music Player Component
function MusicPlayer({ audioRef, isPlaying, setIsPlaying }) {
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePlay = useCallback(async (e) => {
    // Stop propagation so the root onClick handler doesn't also try to play
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Audio play failed:", err);
      }
    }
  }, [isPlaying, isMuted, volume, audioRef, setIsPlaying]);

  const handleVolumeChange = useCallback((e) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  }, [isMuted, audioRef]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (audioRef.current) {
        audioRef.current.volume = nextMuted ? 0 : volume;
      }
      return nextMuted;
    });
  }, [volume, audioRef]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass-card p-4 flex flex-col items-center gap-3 mb-2 min-w-[180px]"
          >
            <p className="text-sm font-nunito font-bold text-pink-500">🎵 Birthday Music</p>
            
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 text-lg"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-lg w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
              </button>
            </div>

            <input 
              type="range" 
              min="0" max="1" step="0.05" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-pink-100 rounded-full appearance-none cursor-pointer accent-pink-400"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={(e) => { e.stopPropagation(); setIsOpen(prev => !prev); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl border-2 transition-all ${
          isPlaying 
            ? 'bg-gradient-to-r from-pink-300 to-pink-400 border-white text-white animate-bounce-slow' 
            : 'bg-white border-pink-200 text-pink-400'
        }`}
      >
        🎵
      </motion.button>
    </div>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // ONE persistent Audio instance, created once
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Create the Audio object once on mount
  useEffect(() => {
    let audioSrc = '/audio/bgm.mp3'; // Fallback
    const keys = Object.keys(audioFiles);
    if (keys.length > 0) {
      // Map "/public/audio/file.mp3" to "/audio/file.mp3" to avoid Vite root warnings
      audioSrc = keys[0].replace('/public', '');
    }

    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'metadata';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // First interaction: start music once, never again
  useEffect(() => {
    const handleInteraction = async () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      // Clean up event listeners immediately
      const events = ['click', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'];
      events.forEach(evt => window.removeEventListener(evt, handleInteraction, { capture: true }));

      if (audioRef.current) {
        try {
          audioRef.current.volume = 0; // Start at 0 for fade in
          await audioRef.current.play();
          setIsPlaying(true);
          
          // Smooth fade in over 2 seconds to the target default volume (0.3)
          const targetVolume = 0.3;
          const fadeDuration = 2000; // ms
          const intervalMs = 100;
          const volStep = targetVolume / (fadeDuration / intervalMs);
          
          let currentVol = 0;
          const fadeInterval = setInterval(() => {
            currentVol = Math.min(targetVolume, currentVol + volStep);
            if (audioRef.current) {
              audioRef.current.volume = currentVol;
            }
            if (currentVol >= targetVolume) {
              clearInterval(fadeInterval);
            }
          }, intervalMs);
        } catch (e) {
          // Silently wait for another interaction or manual play if blocked
        }
      }
    };

    const events = ['click', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, handleInteraction, { once: true, capture: true }));

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleInteraction, { capture: true }));
    };
  }, []);

  return (
    <div className="relative w-full bg-[#fff0f5] min-h-screen text-[#4a4a4a] overflow-hidden font-nunito">

      {/* Global Pastel Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5] via-[#ffe4e1] to-[#fff0f5] opacity-50"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ffb6c1] opacity-30 blur-[100px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ffc0cb] opacity-30 blur-[120px] rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-[#ff69b4] opacity-20 blur-[150px] rounded-full animate-blob" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Background Emojis/Decorations */}
        <div className="absolute top-[15%] left-[10%] text-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute top-[40%] right-[15%] text-4xl opacity-30 animate-float" style={{ animationDelay: '3s' }}>✨</div>
        <div className="absolute bottom-[20%] left-[20%] text-3xl opacity-40 animate-sway" style={{ animationDelay: '2s' }}>🎀</div>
        <div className="absolute bottom-[30%] right-[25%] text-2xl opacity-40 animate-float" style={{ animationDelay: '5s' }}>🦋</div>
        <div className="absolute top-[60%] left-[5%] text-2xl opacity-30 animate-sway" style={{ animationDelay: '0s' }}>🎈</div>
        <div className="absolute top-[10%] right-[30%] text-2xl opacity-40 animate-float" style={{ animationDelay: '2.5s' }}>🌷</div>
      </div>

      {!loaded ? (
        <Page1_Loading onComplete={() => setLoaded(true)} />
      ) : (
        <>
          <main>
            <ErrorBoundary name="Welcome"><Page2_Welcome /></ErrorBoundary>
            <ErrorBoundary name="PhotoIntro"><Page3_PhotoIntro /></ErrorBoundary>
            <ErrorBoundary name="FunnyQuestion"><Page4_FunnyQuestion /></ErrorBoundary>
            <ErrorBoundary name="GiftBox"><Page5_GiftBox /></ErrorBoundary>
            {/* <ErrorBoundary name="FriendshipMeter"><Page7_FriendshipMeter /></ErrorBoundary> */}
            <ErrorBoundary name="Awards"><Page8_Awards /></ErrorBoundary>
            <ErrorBoundary name="Galaxy"><Page9_Galaxy /></ErrorBoundary>
            <ErrorBoundary name="Scrapbook"><Page10_Scrapbook /></ErrorBoundary>
            {/* <ErrorBoundary name="CatchStars"><Page11_CatchStars /></ErrorBoundary> */}
            <ErrorBoundary name="LuckyWheel"><Page12_LuckyWheel /></ErrorBoundary>
            <ErrorBoundary name="Cake"><Page13_Cake /></ErrorBoundary>
            <ErrorBoundary name="PhotoWall"><Page14_PhotoWall /></ErrorBoundary>
            <ErrorBoundary name="Final"><Page15_Final /></ErrorBoundary>
          </main>

          {/* Floating Music Player */}
          <MusicPlayer audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </>
      )}
    </div>
  );
}

export default App;

