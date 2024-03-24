/* eslint-disable no-console */
import 'dotenv/config';
import fs from 'fs';
import { OpenAI } from 'openai';
import path from 'path';
import { extractDataForFineTuning } from '../functions';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function uploadTrainingData() {
  try {
    const fileResponse = await openai.files.create({
      file: fs.createReadStream(
        path.join(__dirname, '../temp/training_data.jsonl')
      ),
      purpose: 'fine-tune',
    });
    console.log(`File uploaded with ID: ${fileResponse.id}`);
    return fileResponse.id;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

async function startFineTuning(fileId) {
  try {
    const fineTuneResponse = await openai.fineTuning.jobs.create({
      training_file: fileId,
      model: 'babbage-002',
    });
    console.log(`Fine-tuning job started with ID: ${fineTuneResponse.id}`);
    return fineTuneResponse.id;
  } catch (error) {
    console.error('Error starting fine-tuning:', error);
    throw error;
  }
}

async function cleanup() {
  fs.unlinkSync(path.join(__dirname, '../temp/training_data.jsonl'));
  console.log('Temporary files cleaned up.');
}

async function main() {
  await extractDataForFineTuning();
  const fileId = await uploadTrainingData();
  await startFineTuning(fileId);
  await cleanup();
}

main().catch((e) => console.error(e));
