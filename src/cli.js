#!/usr/bin/env node
import BubblavTools from './index.js';

const [,, command, value] = process.argv;
const apiKey = process.env.BUBBLAV_API_KEY;

if (!command) {
  console.error('Usage: npx @bubblav/tools <command>');
  console.error('Commands: scrape <url> | skills add <skill-name>');
  console.error('Skills: web-scrape-md, manage-custom-tools');
  process.exit(1);
}

if (command === 'skills' && process.argv[3] === 'add' && process.argv[4] === 'web-scrape-md') {
  console.log('Run: npx skills add github:bubblav-org/tools/skills/web-scrape-md');
  process.exit(0);
}

if (command === 'skills' && process.argv[3] === 'add' && process.argv[4] === 'manage-custom-tools') {
  console.log('Run: npx skills add github:bubblav-org/tools/skills/manage-custom-tools');
  process.exit(0);
}

if (command !== 'scrape') {
  console.error('Unknown command. Use: scrape <url>');
  process.exit(1);
}

const url = value;
if (!url) {
  console.error('Usage: npx @bubblav/tools scrape <url>');
  process.exit(1);
}

if (!apiKey) {
  console.error('Set BUBBLAV_API_KEY environment variable.');
  process.exit(1);
}

const client = new BubblavTools({ apiKey });

client.scrape(url)
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
