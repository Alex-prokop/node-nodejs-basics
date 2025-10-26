import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('data', (chunk) => hash.update(chunk));
  stream.on('end', () => {
    const result = hash.digest('hex');
    console.log(result);
  });

  stream.on('error', () => {
    throw new Error('FS operation failed');
  });
};

await calculateHash();
