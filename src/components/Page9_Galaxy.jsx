import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import photosData from '../data/photos.json';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';

// Generate galaxy photo positions
const GALAXY_COUNT = 50;
const galaxyPhotos = Array.from({ length: GALAXY_COUNT }).map((_, i) => {
  const photo = photosData[i % photosData.length];
  const radius = Math.random() * 10 + 5;
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos((Math.random() * 2) - 1);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  return { ...photo, uniqueId: i, position: [x, y, z] };
});

// Safe photo node that catches its own texture errors
function PhotoNode({ position, url, caption, onClick }) {
  const ref = useRef();
  const randomSpeed = useMemo(() => (Math.random() * 0.002) + 0.001, []);

  // useTexture with error handling via onError
  let texture = null;
  try {
    texture = useTexture(url);
  } catch (e) {
    // If useTexture throws synchronously (unlikely but safe), skip this node
    console.warn(`[Galaxy] Failed to load texture: ${url}`, e);
    return null;
  }

  useFrame(() => {
    if (ref.current) {
      ref.current.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), randomSpeed);
    }
  });

  if (!texture) return null;

  return (
    <group ref={ref} position={position}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(url, caption); }}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      {/* White border behind the photo */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

// Wrapper that catches individual photo errors so one bad photo doesn't kill the gallery
function SafePhotoNode(props) {
  return (
    <ErrorBoundary name={`PhotoNode-${props.url}`} fallback={null}>
      <Suspense fallback={null}>
        <PhotoNode {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Loading indicator that shows inside the canvas
function Loader() {
  const { progress } = useProgress();
  return (
    <group>
      {/* Simple text won't work in R3F, so we skip the HTML overlay here */}
    </group>
  );
}

// The actual 3D scene, separated so Suspense + ErrorBoundary can wrap it
function GalaxyScene({ onPhotoClick }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group>
        {galaxyPhotos.map((photo) => (
          <SafePhotoNode
            key={photo.uniqueId}
            position={photo.position}
            url={photo.url}
            caption={photo.caption}
            onClick={(url, caption) => onPhotoClick({ url, caption })}
          />
        ))}
      </group>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={30}
        minDistance={5}
      />
    </>
  );
}

// Loading overlay shown outside the canvas
function LoadingOverlay() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 pointer-events-none">
      <div className="text-center">
        <p className="text-xl font-outfit text-white mb-4">Loading Galaxy...</p>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

// Canvas fallback if the whole 3D scene fails
function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0f0c29] to-[#302b63]">
      <div className="glass-card p-8 text-center">
        <p className="text-4xl mb-4">🌌</p>
        <h3 className="text-2xl font-outfit font-bold text-white mb-2">Galaxy of Memories</h3>
        <p className="text-gray-300">The 3D galaxy is loading your photos...</p>
        <p className="text-gray-400 text-sm mt-2">Add your photos to the public/photos/ folder</p>
      </div>
    </div>
  );
}

export default function Page9_Galaxy() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="h-screen w-full relative bg-black overflow-hidden z-10" id="galaxy">

      {/* 3D Canvas wrapped in ErrorBoundary */}
      <div className={`absolute inset-0 transition-all duration-1000 ${selected ? 'blur-md scale-110' : ''}`}>
        <ErrorBoundary name="GalaxyCanvas" fallback={<CanvasFallback />}>
          <Canvas
            camera={{ position: [0, 5, 20], fov: 60 }}
            onCreated={({ gl }) => {
              // Handle WebGL context loss gracefully
              const canvas = gl.domElement;
              canvas.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('[Galaxy] WebGL context lost');
              });
              canvas.addEventListener('webglcontextrestored', () => {
                console.log('[Galaxy] WebGL context restored');
              });
            }}
          >
            <Suspense fallback={<Loader />}>
              <GalaxyScene onPhotoClick={setSelected} />
            </Suspense>
          </Canvas>
          <LoadingOverlay />
        </ErrorBoundary>
      </div>

      {/* Overlay Instructions */}
      {!selected && (
        <div className="absolute top-10 left-0 right-0 text-center pointer-events-none z-10">
          <h2 className="text-3xl md:text-5xl font-outfit text-white font-bold drop-shadow-lg mb-2">Galaxy of Memories</h2>
          <p className="text-gray-300 drop-shadow-md">Drag to explore. Scroll to zoom. Click a photo.</p>
        </div>
      )}

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white p-4 pb-12 rounded-lg max-w-2xl w-full rotate-2 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-white/50 backdrop-blur-md rotate-[-3deg] z-10" />

              <img
                src={selected.url}
                alt="Memory"
                className="w-full h-auto max-h-[60vh] object-cover rounded pointer-events-none"
                onError={(e) => { e.target.style.background = '#e2e8f0'; e.target.alt = 'Photo placeholder'; }}
              />
              <p className="text-center font-outfit text-2xl text-gray-800 mt-6 font-medium">
                {selected.caption}
              </p>

              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
