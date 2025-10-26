import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

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
