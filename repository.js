import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAllLessons() {
  return prisma.lesson.findMany({
    include: { sections: true },
  });
}

export async function findLessonById(id) {
  return prisma.lesson.findUnique({
    where: { id },
    include: { sections: true },
  });
}

export async function createLesson(title, sections) {
  return prisma.lesson.create({
    data: {
      title,
      sections: {
        create: sections,
      },
    },
  });
}

export async function deleteLesson(id) {
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
