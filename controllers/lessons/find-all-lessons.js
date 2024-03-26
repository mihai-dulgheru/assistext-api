import { lessonsRepository } from '../../repository';

async function findAllLessons(_req, res) {
  const lessons = await lessonsRepository.findAllLessons();
  res.json(lessons);
}

export default findAllLessons;
