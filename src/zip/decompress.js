import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const decompress = async () => {
  const sourcePath = path.join(__dirname, 'files', 'archive.gz');
  const destinationPath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const gunzip = createGunzip();

  readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on('finish', () => console.log('✅ Decompression finished.'))
    .on('error', () => {
      throw new Error('FS operation failed');
    });
};

await decompress();
