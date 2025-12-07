const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/mac/development/freelance/Assets/images';
const destDir = path.join(process.cwd(), 'public', 'images');

console.log('Source:', sourceDir);
console.log('Destination:', destDir);

// Create destination directory
if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
  fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
}
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created directory:', destDir);
}

const imageMap = {
  '0 (1).png': 'hero-ship-sea.png',
  '0 (2).png': 'about-sobek-ship.png',
  '0 (3).png': 'right-line-containers.png',
  '0 (4).png': 'tracking-container-truck.png',
  '0 (5).png': 'industries-container.png',
  '0 (6).png': 'services-feature-01.png',
  '0 (7).png': 'services-feature-02.png',
  '0 (8).png': 'testimonials-bg.png',
};

console.log('\nCopying images...\n');

let copied = 0;
let failed = 0;

Object.entries(imageMap).forEach(([sourceFile, destFile]) => {
  const sourcePath = path.join(sourceDir, sourceFile);
  const destPath = path.join(destDir, destFile);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ ${sourceFile} → ${destFile}`);
      copied++;
    } catch (error) {
      console.error(`✗ Error copying ${sourceFile}:`, error.message);
      failed++;
    }
  } else {
    console.error(`⚠ Source file not found: ${sourcePath}`);
    failed++;
  }
});

console.log(`\n✅ Copied: ${copied} files`);
if (failed > 0) {
  console.log(`❌ Failed: ${failed} files`);
}

// List final files
console.log('\nFiles in public/images/:');
try {
  const files = fs.readdirSync(destDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(destDir, file));
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
} catch (error) {
  console.error('Error listing files:', error.message);
}

