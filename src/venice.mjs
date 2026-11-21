const BASE_URL = 'https://api.venice.ai/api/v1';

export function createVeniceClient(apiKey = process.env.VENICE_API_KEY) {
  if (!apiKey?.trim()) {
    throw new Error('VENICE_API_KEY is required.');
  }

  async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`Venice request failed (${response.status}).`);
    }

    return response.json();
  }

  return {
    listModels: () => request('/models'),
    chatCompletion: (body) => request('/chat/completions', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  };
}
