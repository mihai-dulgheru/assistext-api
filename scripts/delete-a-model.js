/* eslint-disable no-console */
import 'dotenv/config';
import { OpenAI } from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function deleteAFineTunedModel(model) {
  try {
    const modelDeleted = await openai.models.del(model);
    console.log(`Model deleted: ${modelDeleted.id}`);
    return modelDeleted;
  } catch (error) {
    console.error('Error deleting model:', error);
    throw error;
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.error('Usage: node scripts/delete-a-model.js <model-id>');
    process.exit(1);
  }
  const model = process.argv[2];
  await deleteAFineTunedModel(model);
}

main().catch((e) => console.error(e));
