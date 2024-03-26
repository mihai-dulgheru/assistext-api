import prisma from '../../prisma-client';

async function findLessonById(id) {
  return prisma.lesson.findUnique({
    where: { id },
    include: { sections: true },
  });
}

export default findLessonById;
