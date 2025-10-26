import { promises as fs } from 'fs';
import { join } from 'path';

const create = async () => {
  const filesDir = join(process.cwd(), 'src', 'fs', 'files');
  const freshFile = join(filesDir, 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    await fs.mkdir(filesDir, { recursive: true });

    const fileHandle = await fs.open(freshFile, 'wx');
    await fileHandle.write(fileContent);
    await fileHandle.close();
  } catch {
    throw new Error('FS operation failed');
  }
};

await create();
