import express from 'express';

import Game from './models/game.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

// Add new game
router.post('/games', async (req, res) => {
  const game = new Game({
    user1: 'andres',
    user2: 'perez',
    winner: 'andres'
  });

  await game.save();

  req.send(game);
});

// Get one game
router.get('/games/:id', async (req, res) => {
  const game = await Game.findOne({ _id: req.params.id });
  res.send(game);
});

export default router;
