#!/usr/bin/env node

import { argv } from 'process';
import { cp } from 'fs/promises';

const [source, destination] = argv.slice(2);

try {
  await cp(source, destination, { recursive: true });
  console.info('Files copied successfully.');
} catch (error) {
  console.info('Could not copy files');
  console.info(error);
}
