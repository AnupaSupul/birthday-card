import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import allPhotosData from '../data/photos-galaxy-all.json';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';

// Shared texture loader (reused across all PhotoNodes — avoids creating new instances)
const sharedTextureLoader = new THREE.TextureLoader();

// Dynamically detect new images in the page9-galaxy folder at dev/build time
const rawGalaxyPhotos = import.meta.glob('/public/photos/originals/page9-galaxy/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url' });

const getCombinedPhotos = () => {
  const existingPhotos = [...allPhotosData];
  const existingOriginalPaths = new Set(existingPhotos.map(p => p.original));
  const newPhotos = [];
  let nextId = existingPhotos.length > 0 ? Math.max(...existingPhotos.map(p => p.id)) + 1 : 1;

  for (const path in rawGalaxyPhotos) {
    // path is like "/public/photos/originals/page9-galaxy/img.jpg"
    // allPhotosData original paths are like "/photos/originals/page9-galaxy/img.jpg"
    const relativePath = path.replace('/public', '');
    
    if (!existingOriginalPaths.has(relativePath)) {
      // This is a newly added photo that isn't in the manifest yet
      // The resolved URL from Vite is in the default export when using query: '?url'
      const resolvedUrl = rawGalaxyPhotos[path].default || rawGalaxyPhotos[path];
      
      newPhotos.push({
        id: nextId++,
        original: relativePath,
        // Since it's not optimized yet, fallback to the raw URL for both
        optimized: resolvedUrl,
        thumbnail: resolvedUrl,
        caption: "A new memory ✨",
        page: "page9-galaxy"
      });
    }
  }
  
  return [...existingPhotos, ...newPhotos];
};

const finalGalaxyPhotosList = getCombinedPhotos();

// Generate galaxy photo positions dynamically from the manifest
// GALAXY_COUNT grows automatically as you add more photos
function generateGalaxyPositions(photos) {
  return photos.map((photo, i) => {
    const radius = Math.random() * 10 + 5;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return { ...photo, uniqueId: i, position: [x, y, z] };
  });
}

// Photo node — loads thumbnail texture for 3D scene (300px is plenty for small planes)
// Hook count is always constant: useRef, useState, useState, useMemo, useEffect, useFrame = 6
function PhotoNode({ position, thumbnailUrl, optimizedUrl, caption, onClick }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const randomSpeed = useMemo(() => (Math.random() * 0.002) + 0.001, []);

  // Load THUMBNAIL texture (small, fast, good enough for 3D planes)
  useEffect(() => {
    let cancelled = false;
    sharedTextureLoader.load(
      thumbnailUrl,
      (tex) => { if (!cancelled) setTexture(tex); },
      undefined,
      () => { /* silently skip failed textures */ }
    );
    return () => {
      cancelled = true;
      // Dispose texture when this node unmounts (memory cleanup)
      if (texture) {
        texture.dispose();
      }
    };
  }, [thumbnailUrl]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), randomSpeed);
    }
  });

  if (!texture) return null;

  return (
    <group ref={ref} position={position}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(optimizedUrl, caption); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      {/* White border behind the photo */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshBasicMaterial color={hovered ? "#ffb6c1" : "white"} />
      </mesh>
      {/* Glow when hovered */}
      {hovered && (
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.0, 2.0]} />
          <meshBasicMaterial color="#ffb6c1" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// The actual 3D scene
function GalaxyScene({ galaxyPhotos, onPhotoClick }) {
  return (
    <>
      <ambientLight intensity={1.2} color="#ffe4e1" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#fff" />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} color="#ffb6c1" />

      <group>
        {galaxyPhotos.map((photo) => (
          <PhotoNode
            key={photo.uniqueId}
            position={photo.position}
            thumbnailUrl={photo.thumbnail}
            optimizedUrl={photo.optimized}
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

// Canvas fallback if the whole 3D scene fails
function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none">
      <div className="glass-card p-8 text-center">
        <p className="text-4xl mb-4">🌸</p>
        <h3 className="text-2xl font-pacifico font-bold text-pink-500 mb-2">Floating Memories</h3>
        <p className="text-gray-600 font-nunito">The magical garden is loading your photos...</p>
      </div>
    </div>
  );
}

export default function Page9_Galaxy() {
  const [selected, setSelected] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const sectionRef = useRef(null);

  // Generate positions once from the full combined list (memoized)
  const galaxyPhotos = useMemo(() => generateGalaxyPositions(finalGalaxyPhotosList), []);

  // Lazy-load: only mount the Canvas when entering fullscreen for the first time
  // This prevents Three.js from initializing until the user wants it
  useEffect(() => {
    if (isFullscreen && !showCanvas) {
      setShowCanvas(true);
    }
  }, [isFullscreen, showCanvas]);

  // OPTION A: When fullscreen, disable page scrolling entirely
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handleEnterGallery = useCallback(() => {
    setIsFullscreen(true);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleExitGallery = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`w-full relative bg-transparent overflow-hidden z-10 transition-all duration-500 ${isFullscreen ? 'h-screen fixed inset-0 z-[999]' : 'h-screen'}`}
      id="galaxy"
    >

      {/* 3D Canvas — only mounted after first Enter Gallery click */}
      <div className={`absolute inset-0 transition-all duration-1000 ${selected ? 'blur-md scale-110' : ''}`}>
        {showCanvas ? (
          <ErrorBoundary name="GalaxyCanvas" fallback={<CanvasFallback />}>
            <Canvas
              camera={{ position: [0, 5, 20], fov: 60 }}
              onCreated={({ gl }) => {
                const canvas = gl.domElement;
                canvas.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('[Galaxy] WebGL context lost');
                });
              }}
            >
              <GalaxyScene galaxyPhotos={galaxyPhotos} onPhotoClick={setSelected} />
            </Canvas>
          </ErrorBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      {/* Overlay Instructions & Controls */}
      {!selected && (
        <div className="absolute top-10 left-0 right-0 text-center pointer-events-none z-10">
          <h2 className="text-3xl md:text-5xl font-pacifico text-[#ff8da1] font-bold drop-shadow-sm mb-2">Floating Memories</h2>
          <p className="text-gray-600 font-nunito font-semibold drop-shadow-sm mb-1">
            {galaxyPhotos.length} photos floating in your memory galaxy
          </p>
          <p className="text-gray-500 font-nunito text-sm drop-shadow-sm mb-4">
            {isFullscreen ? 'Drag to explore. Scroll to zoom. Click a photo.' : 'Click "Enter Gallery" to explore in fullscreen!'}
          </p>
          <div className="pointer-events-auto inline-block">
            {!isFullscreen ? (
              <button 
                onClick={handleEnterGallery}
                className="btn-cute px-6 py-3 text-lg"
              >
                Enter Gallery ✨
              </button>
            ) : (
              <button 
                onClick={handleExitGallery}
                className="bg-white/80 backdrop-blur-sm text-pink-500 font-nunito font-bold px-6 py-3 rounded-full border-2 border-pink-200 shadow-md hover:shadow-lg transition-all hover:bg-white"
              >
                Exit Gallery ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Popup Modal — uses OPTIMIZED full-res image */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="polaroid-frame max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cute-tape"></div>

              <div className="bg-gray-100 overflow-hidden">
                <img
                  src={selected.url}
                  alt="Memory"
                  className="w-full h-auto max-h-[60vh] object-cover pointer-events-none"
                  onError={(e) => { e.target.style.background = 'linear-gradient(135deg, #f472b6, #a855f7, #60a5fa)'; e.target.alt = 'Photo placeholder'; }}
                />
              </div>
              <p className="text-center font-pacifico text-2xl text-gray-700 mt-6 font-medium">
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

