import prisma from '../../prisma-client';

async function deleteLesson(id) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { sections: true },
  });
  if (!lesson) {
    return null;
  }
  const sectionIds = lesson.sections.map((section) => section.id);
  await prisma.section.deleteMany({
    where: { id: { in: sectionIds } },
  });
  return prisma.lesson.delete({
    where: { id },
  });
}

export default deleteLesson;
