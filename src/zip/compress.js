import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const compress = async () => {
  const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const destinationPath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const gzip = createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => console.log('✅ Compression finished.'))
    .on('error', () => {
      throw new Error('FS operation failed');
    });
};

await compress();
