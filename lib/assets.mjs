import { cp } from 'fs/promises';

try {
  await cp('./source/images', './build/images', { recursive: true });
  console.info('Assets copied successfully.');
} catch (error) {
  console.info(error);
  console.info('Could not copy assets');
}
