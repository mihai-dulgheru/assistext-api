import { Router } from 'express';
import { lessonsController } from '../controllers';
import { asyncWrapper } from '../utils';

const router = Router();

router.get('/', asyncWrapper(lessonsController.findAllLessons));
router.get('/:id', asyncWrapper(lessonsController.findLessonById));
router.post('/', asyncWrapper(lessonsController.createLesson));
router.delete('/:id', asyncWrapper(lessonsController.deleteLesson));

export default router;
