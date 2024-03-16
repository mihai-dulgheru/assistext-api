const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Lecția 1',
      sections: {
        create: [
          {
            subtitle: 'Introducere în curs',
            content: 'Acesta este conținutul lecției 1.',
          },
        ],
      },
    },
  });

  console.log(`Lecția creată: ${lesson1.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
