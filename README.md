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

Get a skill install path:

```bash
npx @bubblav/tools skills add web-scrape-md
npx @bubblav/tools skills add manage-custom-tools
```

## Skills

### web-scrape-md

Scrape a public URL into markdown for AI context. Activates when you ask to read or scrape a web page.

### manage-custom-tools

Create and manage custom webhook tools for your BubblaV chatbot via the MCP server. Activates when you ask to add, update, delete, or manage custom tools for your chatbot.

**Example prompts:**
- "Add a custom tool to my chatbot that finds tournaments near a city"
- "List my custom tools"
- "Update the endpoint for my search tool"

**Requires:** Pro plan or higher.

## Claude Code Plugin

### Install via marketplace

Add the BubblaV marketplace and install the plugin:

```text
/plugin marketplace add bubblav-org/tools
```

Then browse and install from the **Discover** tab, or install directly:

```text
/plugin install bubblav-tools@bubblav-org-tools
```

After installing, reload to activate:

```text
/reload-plugins
```

### Configure API key

1. Log in to your [BubblaV dashboard](https://www.bubblav.com)
2. Navigate to your **Website Settings** page
3. Click the **API Keys** tab
4. Click **Generate New Key**
5. Enter a name (e.g. "Claude Code") and select **MCP scopes**
6. Click **Generate** and copy the key immediately — it won't be shown again

Then set it in your project's `.claude/.env` file:

```bash
# .claude/.env
BUBBLAV_API_KEY=bubblav_mcp_YOUR_API_KEY
```

The skill will prompt you for the key on first use if it's not configured. Once saved to `.claude/.env`, it persists across sessions.
