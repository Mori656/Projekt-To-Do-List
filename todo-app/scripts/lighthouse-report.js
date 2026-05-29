import fs from 'node:fs';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';

const url = 'http://localhost:3000';
const outputPath = './reports/lighthouse-report.json';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const endpoint = new URL(browser.wsEndpoint());
    const result = await lighthouse(url, {
      port: Number(endpoint.port),
      output: 'json',
      logLevel: 'info',
      onlyCategories: ['accessibility'],
      chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    fs.writeFileSync(outputPath, result.report);
    console.log(`Wrote Lighthouse accessibility report to ${outputPath}`);
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});