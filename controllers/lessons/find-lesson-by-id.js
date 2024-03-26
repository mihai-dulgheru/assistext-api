import { lessonsRepository } from '../../repository';

async function findLessonById(req, res) {
  const lesson = await lessonsRepository.findLessonById(req.params.id);
  if (lesson) {
    res.json(lesson);
  } else {
    res
      .status(404)
      .json({ name: 'NotFoundError', message: 'Lesson not found' });
  }
}

export default findLessonById;
