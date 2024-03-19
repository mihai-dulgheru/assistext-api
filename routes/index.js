import { Router } from 'express';
const router = Router();

router.get('/', function (_req, res) {
  res.status(200).json({ message: 'Connected!' });
});

export default router;
