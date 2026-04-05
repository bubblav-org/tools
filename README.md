# @bubblav/tools

BubblaV SDK and CLI for scraping public pages into markdown with the BubblaV API.

## Install

```bash
npm install @bubblav/tools
```

## SDK

```js
import BubblavTools from '@bubblav/tools';

const client = new BubblavTools({
  apiKey: process.env.BUBBLAV_API_KEY,
});

const result = await client.scrape('https://example.com');
console.log(result.markdown);
```

## CLI

Set your API key first:

```bash
export BUBBLAV_API_KEY=bubblav_mcp_YOUR_API_KEY
```

Scrape a page:

```bash
npx @bubblav/tools scrape https://example.com
```

Get the Claude Code skill install path:

```bash
npx @bubblav/tools skills add web-scrape-md
```

## Claude Code Plugin

Install directly from GitHub:

```text
/plugin install github:bubblav-org/tools/claude-code-plugin
```

## Release

This repo publishes to npm from GitHub Actions when a GitHub Release is published, or manually via `workflow_dispatch`.
