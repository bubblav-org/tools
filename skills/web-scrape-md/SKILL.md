---
name: web-scrape-md
description: Scrape a public URL into markdown using BubblaV scrape API. Use for low-token web context retrieval.
---

Use this skill when you need to fetch a public URL and keep tokens low.

## API Key (Required)

This skill requires a BubblaV API key. Follow this flow:

1. Check env var `BUBBLAV_API_KEY` (resolved via `.claude/.env` hierarchy)
2. If not found, use `AskUserQuestion` to ask the user for their API key:
   - Question: "I need your BubblaV API key to scrape web pages. You can get one from your BubblaV dashboard. Please paste it below:"
   - Header: "API Key"
   - Options: two options — "Provide API key" (user will type it as free text) and "Skip for now" (abort the skill)
3. If the user provides the key, save it to `.claude/.env` as `BUBBLAV_API_KEY=<value>` and proceed
4. If the user skips, abort the skill and suggest using `mcp__web_reader__webReader` or `WebFetch` as fallback

## Tool
- API endpoint: `POST https://www.bubblav.com/api/scrape`
- Header: `X-API-Key: <BUBBLAV_API_KEY>`
- Body: `{ "url": "https://example.com" }`

## Output
Returns:

```json
{
  "url": "https://example.com/final",
  "markdown": "# Page title ..."
}
```

## Notes
- Requires `mcp:tools:execute` scope.
- Prefer this over raw HTML fetch for LLM context efficiency.
- The same key can be reused across sessions once saved to `.claude/.env`.
