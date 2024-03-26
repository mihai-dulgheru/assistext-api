import { readFileSync } from 'fs';
import prisma from '../prisma-client';

async function main() {
  await prisma.section.deleteMany();
  await prisma.lesson.deleteMany();

  const data = JSON.parse(readFileSync('data/copywriting_lessons.json'));

  for (const lesson of data) {
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        sections: {
          create: lesson.sections.map((section) => ({
            subtitle: section.subtitle,
            content: section.content,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
