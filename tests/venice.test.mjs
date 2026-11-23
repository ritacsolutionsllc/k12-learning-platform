import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { createVeniceClient } from '../src/venice.mjs';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('requires a nonempty API key before making requests', () => {
  assert.throws(() => createVeniceClient('  '), /VENICE_API_KEY is required/);
});

test('reads the key from the process environment by default', async () => {
  const previousKey = process.env.VENICE_API_KEY;
  process.env.VENICE_API_KEY = 'test-key';
  try {
    globalThis.fetch = async (_url, options) => {
      assert.equal(options.headers.Authorization, 'Bearer test-key');
      return { ok: true, json: async () => ({ data: [] }) };
    };
    await createVeniceClient().listModels();
  } finally {
    if (previousKey === undefined) delete process.env.VENICE_API_KEY;
    else process.env.VENICE_API_KEY = previousKey;
  }
});

test('uses the Venice models and chat completion endpoints', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({ data: [] }) };
  };

  const client = createVeniceClient('test-key');
  await client.listModels();
  await client.chatCompletion({ model: 'test-model', messages: [] });

  assert.equal(calls[0].url, 'https://api.venice.ai/api/v1/models');
  assert.equal(calls[1].url, 'https://api.venice.ai/api/v1/chat/completions');
  assert.equal(calls[1].options.method, 'POST');
  assert.equal(calls[1].options.headers.Authorization, 'Bearer test-key');
  assert.deepEqual(JSON.parse(calls[1].options.body), { model: 'test-model', messages: [] });
});

test('reports provider failures without including response contents', async () => {
  globalThis.fetch = async () => ({
    ok: false,
    status: 401,
    text: async () => 'sensitive provider details',
  });
  await assert.rejects(createVeniceClient('test-key').listModels(), {
    message: 'Venice request failed (401).',
  });
});
