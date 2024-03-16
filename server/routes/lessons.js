import { Router } from 'express';
const router = Router();

// Mock data for demonstration purposes
const lessons = [
  {
    id: 'f7b1e3e3-4b0e-4b5f-8e3e-3f3e3e3e3e3e',
    title: 'Lecția 1',
    sections: [
      {
        subtitle: 'Introducere în curs',
        content: 'Acesta este conținutul lecției 1.',
      },
    ],
  },
];

/* GET lessons listing. */
router.get('/', function (_req, res) {
  res.json(lessons);
});

/* GET lesson by ID. */
router.get('/:id', function (req, res) {
  const { id } = req.params;
  const lesson = lessons.find((lesson) => {
    return lesson.id === id;
  });
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).send('Lesson not found');
  }
});

export default router;
