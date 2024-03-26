import { lessonsRepository } from '../../repository';

async function createLesson(req, res) {
  const { title, sections } = req.body;
  const dbResponse = await lessonsRepository.createLesson(title, sections);
  res.json(dbResponse);
}

export default createLesson;
