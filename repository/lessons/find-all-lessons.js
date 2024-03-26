import prisma from '../../prisma-client';

async function findAllLessons() {
  return prisma.lesson.findMany({
    include: { sections: true },
  });
}

export default findAllLessons;
