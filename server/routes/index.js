import { Router } from 'express';
const router = Router();

router.get('/', function (_req, res) {
  res.render('index', { title: 'Express' });
});

export default router;
