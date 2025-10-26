import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);


const performCalculations = async () => {
  const workerPath = path.join(__dirname, 'worker.js');
  const numCores = cpus().length;

  const tasks = Array.from({ length: numCores }, (_, i) => {
    const value = 10 + i;

    return new Promise((resolve) => {
      const worker = new Worker(workerPath);

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.postMessage(value);
    });
  });

  const results = await Promise.all(tasks);

  console.log(results);
};

await performCalculations();
