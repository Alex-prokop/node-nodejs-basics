import { Transform } from 'node:stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    },
  });

  process.stdin.on('error', () => {
    throw new Error('FS operation failed');
  });

  reverseStream.on('error', () => {
    throw new Error('FS operation failed');
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
