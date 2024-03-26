import prisma from '../../prisma-client';

async function createLesson(title, sections) {
  return prisma.lesson.create({
    data: {
      title,
      sections: {
        create: sections,
      },
    },
  });
}

export default createLesson;
