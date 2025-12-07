const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'app', 'api');
const backupDir = path.join(__dirname, '..', 'app', '_api_backup');

// Move API directory before build
if (fs.existsSync(apiDir)) {
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true, force: true });
  }
  fs.renameSync(apiDir, backupDir);
  console.log('Moved API routes directory for static build');
}

// Build will happen here via npm script

// Restore API directory after build (this will be called manually if needed)
process.on('exit', () => {
  if (fs.existsSync(backupDir) && !fs.existsSync(apiDir)) {
    fs.renameSync(backupDir, apiDir);
    console.log('Restored API routes directory');
  }
});

