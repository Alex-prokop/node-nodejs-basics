import { promises as fs } from 'fs';
import { join } from 'path';
import { getEsmPaths } from './getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
