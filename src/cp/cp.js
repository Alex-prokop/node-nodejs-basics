import { spawn } from 'node:child_process';
import path from 'node:path';
import { getEsmPaths } from '../utils/getEsmPaths.js';

const { __dirname } = getEsmPaths(import.meta.url);

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, './files/script.js');

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Failed to spawn child process:', err);
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['first', 'second', 'third']);
