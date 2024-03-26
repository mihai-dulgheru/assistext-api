import { lessonsRepository } from '../../repository';

async function deleteLesson(req, res) {
  const dbResponse = await lessonsRepository.deleteLesson(req.params.id);
  if (dbResponse) {
    res.json(dbResponse);
  } else {
    res
      .status(404)
      .json({ name: 'NotFoundError', message: 'Lesson not found' });
  }
}

export default deleteLesson;
