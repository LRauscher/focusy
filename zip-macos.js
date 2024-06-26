const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const outputDir = path.resolve(__dirname, 'out/make/zip/darwin/x64');
const outputFile = path.resolve(outputDir, 'focusy-darwin-x64-1.0.0.zip');
const sourceDir = path.resolve(__dirname, 'out/focusy-darwin-x64/focusy.app');

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

const output = fs.createWriteStream(outputFile);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

archive.directory(sourceDir, false);

archive.finalize();