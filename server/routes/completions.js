import { Router } from 'express';
const router = Router();

/* POST completions */
router.post('/', async function (_req, res) {
  try {
    // const response = await axios.post(
    //   'https://api.openai.com/v1/completions',
    //   {
    //     model: 'gpt-3.5-turbo-instruct',
    //     prompt: req.body.prompt,
    //     max_tokens: req.body.maxTokens,
    //     temperature: req.body.temperature,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );

    // res.json(response.data);

    // Mock response
    res.json({
      id: 'cmpl-93AWrOqYgUFttse0oqAeiXHBk54He',
      object: 'text_completion',
      created: 1710542485,
      model: 'gpt-3.5-turbo-instruct',
      choices: [
        {
          text: ' 180°\n\nAceasta este o',
          index: 0,
          logprobs: null,
          finish_reason: 'length',
        },
      ],
      usage: {
        prompt_tokens: 13,
        completion_tokens: 8,
        total_tokens: 21,
      },
    });
  } catch (error) {
    console.log(error.toJSON());
    res.status(500).json({ name: error.name, message: error.message });
  }
});

export default router;
