import express from 'express';

import Game from './models/game.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

router.post('games', async (req, res) => {
  const game = new Game({
    user1: 'andres',
    user2: 'perez',
    winner: 'andres'
  });

  await game.save();

  req.send(game);
});

export default router;
