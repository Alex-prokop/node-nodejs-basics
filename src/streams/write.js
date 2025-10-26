import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });

  process.stdin.on('data', (chunk) => writeStream.write(chunk));
  process.stdin.on('end', () => writeStream.end());
  process.stdin.on('error', () => {
    throw new Error('FS operation failed');
  });

  writeStream.on('finish', () => {
    console.log('\n✅ File written successfully');
  });
  writeStream.on('error', () => {
    throw new Error('FS operation failed');
  });
};

await write();
