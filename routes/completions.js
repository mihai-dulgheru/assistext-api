import { Router } from 'express';
import { completionsController } from '../controllers';
import { asyncWrapper } from '../utils';

const router = Router();

router.post('/', asyncWrapper(completionsController.generateTextCompletion));

export default router;
