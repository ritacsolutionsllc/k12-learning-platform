import { createVeniceClient } from '../src/venice.mjs';

try {
  const client = createVeniceClient();
  const models = await client.listModels();
  const model = models.data?.find((item) => item.id && !item.model_spec?.deprecation);
  if (!model) {
    throw new Error('Venice returned no available text model.');
  }

  const result = await client.chatCompletion({
    model: model.id,
    messages: [{ role: 'user', content: 'Say hello in one short sentence.' }],
    max_tokens: 32,
  });
  const text = result.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Venice returned no text completion.');
  }
  console.log(`Model: ${model.id}\n${text}`);
} catch (error) {
  console.error('Venice smoke test failed:', error.message);
  process.exitCode = 1;
}
