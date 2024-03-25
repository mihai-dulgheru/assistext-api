import { Router } from 'express';
import { OpenAI } from 'openai';

const router = Router();

router.post('/', async function (req, res) {
  try {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const completion = await openai.completions.create({
      model: process.env.OPENAI_MODEL,
      prompt: req.body.prompt.trim(),
      max_tokens: req.body.maxTokens || 16,
      temperature: req.body.temperature || 0,
    });

    res.json(completion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ name: error.name, message: error.message });
  }
});

export default router;
