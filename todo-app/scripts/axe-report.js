import { spawnSync } from 'node:child_process';
import puppeteer from 'puppeteer';

const url = 'http://localhost:3000';
const outputPath = './reports/axe-report.json';
const chromePath = await puppeteer.executablePath();

const result = spawnSync('npx', [
  'axe',
  url,
  '--save',
  outputPath,
  '--tags',
  'wcag2a,wcag2aa',
  '--chrome-path',
  chromePath,
], {
  stdio: 'inherit',
  shell: true,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
