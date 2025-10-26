import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const list = async () => {
  const filesDir = join(__dirname, 'files');

  try {
    const files = await fs.readdir(filesDir);
    console.log(files);
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
