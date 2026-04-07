const { ModelServiceClient } = require('@google-ai/generativelanguage').v1beta;

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Set GEMINI_API_KEY before running this script.');
  }

  const client = new ModelServiceClient({
    fallback: true,
    apiKey,
  });

  const [response] = await client.listModels({});
  if (!response.models || response.models.length === 0) {
    console.log('No models returned.');
    return;
  }

  response.models.forEach((model) => {
    console.log('name:', model.name);
    console.log('  supportedMethods:', model.supportedMethods?.join(', ') || '(none)');
    console.log('  displayName:', model.displayName || '(no displayName)');
    console.log('');
  });
}

main().catch((err) => {
  console.error('ListModels failed:', err.message || err);
  process.exit(1);
});
