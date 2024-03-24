import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function extractDataForFineTuning() {
  const lessons = await prisma.lesson.findMany({
    include: {
      sections: true,
    },
  });

  const dataForFineTuning = lessons
    .map((lesson) => {
      return lesson.sections.map((section) => ({
        prompt: section.subtitle,
        completion: section.content.trim(),
      }));
    })
    .flat();

  fs.writeFileSync(
    path.join(__dirname, '../temp/training_data.jsonl'),
    dataForFineTuning.map((line) => JSON.stringify(line)).join('\n')
  );

  // eslint-disable-next-line no-console
  console.log('Data for fine-tuning prepared.');
}

export default extractDataForFineTuning;
