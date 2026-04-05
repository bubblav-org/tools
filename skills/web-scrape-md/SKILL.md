---
name: web-scrape-md
description: Scrape a public URL into markdown using BubblaV scrape API. Use for low-token web context retrieval.
---

Use this skill when you need to fetch a public URL and keep tokens low.

## Tool
- API endpoint: `POST https://www.bubblav.com/api/scrape`
- Header: `X-API-Key: <bubblav_mcp_...>`
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
- Reuse the same BubblaV MCP API key.
- Requires `mcp:tools:execute` scope.
- Prefer this over raw HTML fetch for LLM context efficiency.
