#!/usr/bin/env node

import { argv } from 'process';
import { rm } from 'fs/promises';

const [directory] = argv.slice(2);

try {
  await rm(directory, { recursive: true, force: true });
  console.info('Directory deleted successfully.');
} catch (error) {
  console.info('Could not delete directory');
  console.info(error);
}
