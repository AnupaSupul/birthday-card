import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ErrorBoundary from './components/ErrorBoundary';

import Page1_Loading from './components/Page1_Loading';
import Page2_Welcome from './components/Page2_Welcome';
import Page3_PhotoIntro from './components/Page3_PhotoIntro';
import Page4_FunnyQuestion from './components/Page4_FunnyQuestion';
import Page5_GiftBox from './components/Page5_GiftBox';
import Page6_FriendshipQuiz from './components/Page6_FriendshipQuiz';
import Page7_FriendshipMeter from './components/Page7_FriendshipMeter';
import Page8_Awards from './components/Page8_Awards';
import Page9_Galaxy from './components/Page9_Galaxy';
import Page10_Scrapbook from './components/Page10_Scrapbook';
import Page11_CatchStars from './components/Page11_CatchStars';
import Page12_LuckyWheel from './components/Page12_LuckyWheel';
import Page13_Cake from './components/Page13_Cake';
import Page14_PhotoWall from './components/Page14_PhotoWall';
import Page15_Final from './components/Page15_Final';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

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

  const handleInteraction = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full bg-[#fff0f5] min-h-screen text-[#4a4a4a] overflow-hidden font-nunito" onClick={handleInteraction}>
      
      {/* Background ambient music - local file */}
      <audio ref={audioRef} loop>
        <source src="/audio/bgm.mp3" type="audio/mpeg" />
      </audio>

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
        <main>
          <ErrorBoundary name="Welcome"><Page2_Welcome /></ErrorBoundary>
          <ErrorBoundary name="PhotoIntro"><Page3_PhotoIntro /></ErrorBoundary>
          <ErrorBoundary name="FunnyQuestion"><Page4_FunnyQuestion /></ErrorBoundary>
          <ErrorBoundary name="GiftBox"><Page5_GiftBox /></ErrorBoundary>
          <ErrorBoundary name="FriendshipMeter"><Page7_FriendshipMeter /></ErrorBoundary>
          <ErrorBoundary name="Awards"><Page8_Awards /></ErrorBoundary>
          <ErrorBoundary name="Galaxy"><Page9_Galaxy /></ErrorBoundary>
          <ErrorBoundary name="Scrapbook"><Page10_Scrapbook /></ErrorBoundary>
          <ErrorBoundary name="CatchStars"><Page11_CatchStars /></ErrorBoundary>
          <ErrorBoundary name="LuckyWheel"><Page12_LuckyWheel /></ErrorBoundary>
          <ErrorBoundary name="Cake"><Page13_Cake /></ErrorBoundary>
          <ErrorBoundary name="PhotoWall"><Page14_PhotoWall /></ErrorBoundary>
          <ErrorBoundary name="Final"><Page15_Final /></ErrorBoundary>
        </main>
      )}
    </div>
  );
}

export default App;
