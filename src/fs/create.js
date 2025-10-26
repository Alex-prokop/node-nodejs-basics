import { promises as fs } from 'fs';
import { join } from 'path';
import { getEsmPaths } from './getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const create = async () => {
  const filesDir = join(__dirname, 'files');
  const freshFile = join(filesDir, 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    await fs.mkdir(filesDir, { recursive: true });
    await fs.writeFile(freshFile, fileContent, { flag: 'wx' });
  } catch {
    throw new Error('FS operation failed');
  }
};

await create();
