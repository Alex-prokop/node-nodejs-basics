import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const copy = async () => {
  const srcDir = join(__dirname, 'files');
  const destDir = join(__dirname, 'files_copy');

  try {
    await fs.access(srcDir);

    try {
      await fs.access(destDir);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    await fs.cp(srcDir, destDir, { recursive: true, errorOnExist: true });
  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();
