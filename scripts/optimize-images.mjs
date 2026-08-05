/**
 * Image Optimization Script
 * 
 * Scans public/photos/originals/ for images, converts them to WebP,
 * creates optimized (max 1200px) and thumbnail (300px) versions.
 * Also generates a photo manifest JSON for each page + a combined galaxy manifest.
 * 
 * Usage: npm run optimize-images
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const ORIGINALS_DIR = path.join(PROJECT_ROOT, 'public', 'photos', 'originals');
const OPTIMIZED_DIR = path.join(PROJECT_ROOT, 'public', 'photos', 'optimized');
const THUMBNAILS_DIR = path.join(PROJECT_ROOT, 'public', 'photos', 'thumbnails');
const DATA_DIR = path.join(PROJECT_ROOT, 'src', 'data');

const OPTIMIZED_MAX_SIZE = 1200;
const THUMBNAIL_SIZE = 300;
const WEBP_QUALITY = 82;

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'];

// Default captions per page (user can customize these in the output JSON later)
const DEFAULT_CAPTIONS = {
  'page3-photo-intro': [
    "One of my favorite memories 😂",
    "Still can't believe this happened!",
    "This picture deserved to be framed.",
    "You somehow look good in every photo.",
  ],
  'page9-galaxy': [
    "Floating in our memories ✨",
    "Another adventure together!",
    "We were so happy here 🥹",
    "This is what friendship looks like.",
    "Can't stop smiling looking at this.",
    "Best day ever!",
    "Take me back here! ✈️",
    "Laughing at nothing, as usual 😂",
    "We need to recreate this photo.",
    "Unforgettable moment 🌸",
  ],
  'page10-scrapbook': [
    "Remember this day? 🥹",
    "We look so chaotic here lol",
    "Best day ever! ☀️",
    "Take me back! ✈️",
    "So much fun together!",
    "This was legendary 🎉",
    "Our matching outfits though 😂",
    "Peak friendship energy 💖",
  ],
  'page14-photo-wall': [
    "Wall of fame material 🏆",
    "This belongs in a museum!",
    "Chef's kiss photo 🤌",
    "We were so cute here!",
    "Iconic. Simply iconic.",
  ],
  'page15-final': [
    "The best is yet to come 💖",
    "Here's to many more adventures!",
  ],
};

function sanitizeFilename(filename) {
  // Remove extension, replace spaces/special chars with hyphens, lowercase
  const name = path.parse(filename).name;
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function processImage(inputPath, outputOptimized, outputThumbnail) {
  try {
    // Optimized version: max 1200px on longest side
    await sharp(inputPath)
      .resize(OPTIMIZED_MAX_SIZE, OPTIMIZED_MAX_SIZE, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputOptimized);

    // Thumbnail version: 300px on longest side
    await sharp(inputPath)
      .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
        fit: 'cover',
      })
      .webp({ quality: 75 })
      .toFile(outputThumbnail);

    return true;
  } catch (err) {
    console.error(`  ❌ Failed to process: ${inputPath}`, err.message);
    return false;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');

  // Verify originals directory exists
  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.error(`❌ Originals directory not found: ${ORIGINALS_DIR}`);
    process.exit(1);
  }

  // Get all page folders
  const pageFolders = fs.readdirSync(ORIGINALS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  if (pageFolders.length === 0) {
    console.error('❌ No page folders found in originals/');
    process.exit(1);
  }

  console.log(`📁 Found ${pageFolders.length} page folders: ${pageFolders.join(', ')}\n`);

  // Per-page manifests
  const pageManifests = {};
  // Combined manifest for galaxy (all unique photos)
  const allPhotos = [];
  const seenFilenames = new Set();
  let globalId = 1;

  for (const folder of pageFolders) {
    const inputDir = path.join(ORIGINALS_DIR, folder);
    const optimizedDir = path.join(OPTIMIZED_DIR, folder);
    const thumbnailDir = path.join(THUMBNAILS_DIR, folder);

    // Create output dirs
    fs.mkdirSync(optimizedDir, { recursive: true });
    fs.mkdirSync(thumbnailDir, { recursive: true });

    // Get all images in this folder
    const files = fs.readdirSync(inputDir)
      .filter(f => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()));

    if (files.length === 0) {
      console.log(`  ⚠️  No images in ${folder}/`);
      continue;
    }

    console.log(`📂 Processing ${folder}/ (${files.length} images)...`);

    const captions = DEFAULT_CAPTIONS[folder] || ["A beautiful memory ✨"];
    const pagePhotos = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const sanitized = sanitizeFilename(file);
      const webpName = `${sanitized}.webp`;

      const inputPath = path.join(inputDir, file);
      const optimizedPath = path.join(optimizedDir, webpName);
      const thumbnailPath = path.join(thumbnailDir, webpName);

      const success = await processImage(inputPath, optimizedPath, thumbnailPath);

      if (success) {
        const caption = captions[i % captions.length];
        const photoEntry = {
          id: globalId++,
          filename: sanitized,
          original: `/photos/originals/${folder}/${file}`,
          optimized: `/photos/optimized/${folder}/${webpName}`,
          thumbnail: `/photos/thumbnails/${folder}/${webpName}`,
          caption: caption,
          page: folder,
        };

        pagePhotos.push(photoEntry);

        // Track for combined galaxy (dedupe by sanitized filename)
        if (!seenFilenames.has(sanitized)) {
          seenFilenames.add(sanitized);
          allPhotos.push(photoEntry);
        }

        console.log(`  ✅ ${file} → ${webpName}`);
      }
    }

    pageManifests[folder] = pagePhotos;
  }

  // Ensure data dir exists
  fs.mkdirSync(DATA_DIR, { recursive: true });

  // Write per-page manifests
  for (const [folder, photos] of Object.entries(pageManifests)) {
    const outPath = path.join(DATA_DIR, `photos-${folder}.json`);
    fs.writeFileSync(outPath, JSON.stringify(photos, null, 2));
    console.log(`\n📄 ${path.basename(outPath)} → ${photos.length} photos`);
  }

  // Write combined galaxy manifest (all unique photos)
  const galaxyPath = path.join(DATA_DIR, 'photos-galaxy-all.json');
  fs.writeFileSync(galaxyPath, JSON.stringify(allPhotos, null, 2));
  console.log(`📄 photos-galaxy-all.json → ${allPhotos.length} unique photos`);

  // Write summary stats
  console.log('\n============================');
  console.log(`🎉 Done! Processed ${globalId - 1} images total.`);
  console.log(`   📁 Optimized → public/photos/optimized/`);
  console.log(`   📁 Thumbnails → public/photos/thumbnails/`);
  console.log(`   📁 Manifests → src/data/`);
  console.log(`   🌌 Galaxy photos: ${allPhotos.length} unique`);
}

main().catch(console.error);
