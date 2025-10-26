import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const rename = async () => {
  const wrong = join(__dirname, 'files', 'wrongFilename.txt');
  const proper = join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(wrong);
    try {
      await fs.access(proper);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    await fs.rename(wrong, proper);
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
