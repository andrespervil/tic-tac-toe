import express from 'express';

// Import models
import Game from './models/game.js';

// Import yup validations
import { gameSchema, singleIdSchema, boardSchema } from './yup.js';

// Import utils
import {
  validateWithSchema,
  formatError,
  checkWinner,
  iaPlay
} from './utils.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  const games = await Game.find().limit(5);
  res.send(games);
});

// Add new game
router.post('/games', async ({ body }, res) => {
  const validateGame = validateWithSchema(gameSchema, { ...body });

  if (validateGame.valid) {
    const result = await Game.create({ ...validateGame.data });

    res.status(200).send(result);
  } else {
    res.status(400).send(formatError(validateGame));
  }
});

// Get one game
router.get('/games/:id', async ({ params }, res) => {
  try {
    const validateGame = validateWithSchema(singleIdSchema, { ...params });

    const game = await Game.findOne({ _id: params.id });
    res.status(200).send(game);
  } catch (error) {
    res.status(400).send(`Error searching game by ID, Game ID:${params.id}`);
  }
});

// Check if some player won
router.post('/game/userPlay', async ({ body: { board } }, res) => {
  const validateBoard = validateWithSchema(boardSchema, board);

  if (validateBoard.valid) {
    // 1. Check if some player won
    const winner = checkWinner(board);

    if (winner) {
      return res.status(200).send({ status: 'finished', winner });
    }
    // 2. IA play
    const newBoard = await iaPlay(board);

    // 3. Check if IA won
    const iaWin = checkWinner(board);
    if (iaWin) {
      return res.status(200).send({ status: 'finished', winner });
    }

    // Return new board, status: playing
    res.status(200).send({ status: 'playing', winner: null, board: newBoard });
  } else {
    res.status(400).send(formatError(validateBoard));
  }
});

export default router;
