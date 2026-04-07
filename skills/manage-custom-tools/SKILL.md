---
name: manage-custom-tools
description: Create and manage custom webhook tools for BubblaV chatbots via the MCP server. Use when users want to add, update, delete, or configure custom tools for their website's chatbot.
---

Use this skill when the user asks to create, update, delete, list, or manage custom tools for their BubblaV chatbot website.

Examples of when to activate:
- "Add a custom tool to my chatbot that finds tournaments near a city"
- "Create a tool for my chatbot to look up product inventory"
- "List my custom tools"
- "Update the endpoint for my search tool"
- "Disable the weather tool on my website"
- "Delete the old API tool"

## API Key (Required)

Check for `BUBBLAV_API_KEY` in the environment. If not found, ask the user:

```
I need your BubblaV MCP API key to manage custom tools.
You can generate one at https://www.bubblav.com/dashboard → Website Settings → API Keys → Generate New Key (select MCP scopes).

Please paste your API key:
```

Save it to `.claude/.env` as `BUBBLAV_API_KEY=bubblav_mcp_...`.

## MCP Server

- **Endpoint**: `POST https://www.bubblav.com/api/mcp`
- **Auth**: `X-API-Key: bubblav_mcp_...` header
- **Protocol**: JSON-RPC 2.0

## Tool: bubblav_list_custom_tools

List all custom webhook tools for the website with activation status.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "bubblav_list_custom_tools",
    "arguments": {}
  }
}
```

Returns: `{ "tools": [...], "total": N }`

## Tool: bubblav_create_custom_tool

Create a new custom webhook tool. Required fields:
- `tool_name` — unique identifier (letters, numbers, underscores, hyphens)
- `display_name` — human-readable name
- `description_for_ai` — instructions for the AI on when to use this tool
- `endpoint_url` — webhook URL (HTTPS)
- `authentication_type` — `none`, `bearer`, or `hmac`

Optional fields:
- `argument_schema` — JSON Schema for tool parameters
- `http_method` — GET (default), POST, PUT, PATCH, DELETE
- `activate_for_website` — auto-activate for current website (default: true)

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "bubblav_create_custom_tool",
    "arguments": {
      "tool_name": "find_tournaments",
      "display_name": "Find Tournaments",
      "description_for_ai": "Search for pickleball tournaments near a given city. Use when a visitor asks about upcoming tournaments in their area.",
      "endpoint_url": "https://api.example.com/tournaments/search",
      "authentication_type": "bearer",
      "http_method": "POST",
      "argument_schema": {
        "type": "object",
        "properties": {
          "city": { "type": "string", "description": "City name to search near" },
          "radius_miles": { "type": "number", "description": "Search radius in miles (default: 50)" }
        },
        "required": ["city"]
      }
    }
  }
}
```

**Important**: The `secret_key` is returned only once at creation. Share it with the user immediately.

## Tool: bubblav_update_custom_tool

Update an existing tool. Provide `tool_id` (from list) and only the fields to change.

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "bubblav_update_custom_tool",
    "arguments": {
      "tool_id": "uuid-from-list",
      "description_for_ai": "Updated instructions for the AI..."
    }
  }
}
```

## Tool: bubblav_delete_custom_tool

Permanently delete a tool (cannot be undone).

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "bubblav_delete_custom_tool",
    "arguments": {
      "tool_id": "uuid-from-list"
    }
  }
}
```

## Tool: bubblav_toggle_custom_tool

Enable or disable a tool for the current website.

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "bubblav_toggle_custom_tool",
    "arguments": {
      "tool_id": "uuid-from-list",
      "enabled": true
    }
  }
}
```

## Notes

- Custom tools require **Pro plan or higher**. Free/Starter users will get a `PLAN_REQUIRED` error.
- `tool_name` must be unique per user (alphanumeric, underscores, hyphens only).
- `endpoint_url` is validated for SSRF (no private IPs, localhost, etc.).
- `description_for_ai` is security-scanned for prompt injection patterns.
- The `secret_key` is only shown once at creation time — save it immediately.
- Tools are **user-level** (shared across websites); activation is **per-website**.
- Always list existing tools first with `bubblav_list_custom_tools` to avoid duplicates.

## Example Flow

User: "Add a tool to find pickleball tournaments near a city"

1. Call `bubblav_list_custom_tools` to check for existing tools
2. Call `bubblav_create_custom_tool` with the tournament search configuration
3. Share the `secret_key` with the user (shown only once)
4. Confirm the tool is active for their website
