import { promises as fs } from 'fs';
import { join } from 'path';
import { getEsmPaths } from './getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const remove = async () => {
  const file = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.unlink(file);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();
