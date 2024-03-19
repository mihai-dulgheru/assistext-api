import { Router } from 'express';
import * as repository from '../repository';
const router = Router();

router.get('/', async (_req, res) => {
  try {
    const lessons = await repository.findAllLessons();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lesson = await repository.findLessonById(req.params.id);
    if (lesson) {
      res.json(lesson);
    } else {
      res
        .status(404)
        .send({ name: 'NotFoundError', message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, sections } = req.body;
    const dbResponse = await repository.createLesson(title, sections);
    res.json(dbResponse);
  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbResponse = await repository.deleteLesson(req.params.id);
    if (dbResponse) {
      res.json(dbResponse);
    } else {
      res
        .status(404)
        .send({ name: 'NotFoundError', message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message });
  }
});

export default router;
