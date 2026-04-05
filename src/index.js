export default class BubblavTools {
  constructor({ apiKey, baseUrl = 'https://www.bubblav.com' } = {}) {
    if (!apiKey) throw new Error('apiKey is required');
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async scrape(url) {
    if (!url) throw new Error('url is required');

    const response = await fetch(`${this.baseUrl}/api/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: JSON.stringify({ url }),
    });

    const raw = await response.text();
    let data = null;

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
      const message = data?.error || raw || `Scrape request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from scrape API');
    }

    return data;
  }
}
