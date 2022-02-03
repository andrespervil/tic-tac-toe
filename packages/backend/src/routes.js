import express from 'express';

// Import models
import Game from './models/game.js';

// Import yup validations
import { gameSchema } from './yup.js';

// Import utils
import { validateWithSchema } from './utils.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

// Add new game
router.post('/games', async ({ body }, res) => {
  const validateGame = validateWithSchema(gameSchema, { ...body });

  if (validateGame.valid) {
    const result = await Game.create({ ...validateGame.data });

    res.status(200).send(result);
  } else {
    res.status(400).send({
      errors: validateGame.data.map(error => error.message),
      message: 'Validation error, Game was not saved's
    });
  }
});

// Get one game
router.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    res.status(200).send(game);
  } catch (error) {
    res
      .status(400)
      .send(`Error searching game by ID, Game ID:${req.params.id}`);
  }
});

export default router;
