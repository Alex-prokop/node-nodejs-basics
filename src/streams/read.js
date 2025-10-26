import { createReadStream } from 'node:fs';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath, { encoding: 'utf-8' });

  stream.on('data', (chunk) => process.stdout.write(chunk));
  stream.on('end', () => process.stdout.write('\n'));
  stream.on('error', () => {
    throw new Error('FS operation failed');
  });
};

await read();
