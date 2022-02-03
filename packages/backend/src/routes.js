import express from 'express';

// Import models
import Game from './models/game.js';

// Import yup validations
import { gameSchema } from './yup.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

// Add new game
router.post('/games', async ({ body }, res) => {
  const data = gameSchema.validate({ ...body });

  debugger;

  const game = new Game({
    user1: body.user1,
    user2: body.user2,
    winner: body.winner
  });

  await game.save();

  res.status(200).send(game);
});

// Get one game
router.get('/games/:id', async (req, res) => {
  const game = await Game.findOne({ _id: req.params.id });
  res.send(game);
});

export default router;
