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

router.post('/game/userPlay', async ({ body: { board } }, res) => {
  // Validate board
  const validateBoard = validateWithSchema(boardSchema, board);

  if (validateBoard.valid) {
    // 1. Check if player won
    let winner = checkWinner(board);

    if (winner === 'draw') {
      return res.status(200).send({ status: 'finished', winner: null, board });
    }
    if (winner === 'X') {
      return res
        .status(200)
        .send({ status: 'finished', winner: 'Player Win', board });
    }

    // 3. IA play
    const newBoard = await iaPlay(board);

    // 4. Check IA won or draw
    winner = checkWinner(newBoard);

    if (winner === 'draw') {
      return res
        .status(200)
        .send({ status: 'finished', winner: null, board: newBoard });
    }
    if (winner === 'X') {
      return res
        .status(200)
        .send({ status: 'finished', winner: 'IA Win', board: newBoard });
    }

    // 6. Return new board, status: playing
    return res
      .status(200)
      .send({ status: 'Next player: X', winner: null, board: newBoard });
  } else {
    res.status(400).send(formatError(validateBoard));
  }
});

export default router;
