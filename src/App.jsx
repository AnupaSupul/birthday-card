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
    <div className="relative w-full bg-background min-h-screen text-foreground overflow-hidden" onClick={handleInteraction}>
      
      {/* Background ambient music - placeholder for now */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_44747eb4bb.mp3?filename=ambient-piano-amp-strings-10711.mp3" type="audio/mpeg" />
      </audio>

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-600/20 blur-[120px] rounded-full animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {!loaded ? (
        <Page1_Loading onComplete={() => setLoaded(true)} />
      ) : (
        <main>
          <ErrorBoundary name="Welcome"><Page2_Welcome /></ErrorBoundary>
          <ErrorBoundary name="PhotoIntro"><Page3_PhotoIntro /></ErrorBoundary>
          <ErrorBoundary name="FunnyQuestion"><Page4_FunnyQuestion /></ErrorBoundary>
          <ErrorBoundary name="GiftBox"><Page5_GiftBox /></ErrorBoundary>
          <ErrorBoundary name="FriendshipQuiz"><Page6_FriendshipQuiz /></ErrorBoundary>
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
