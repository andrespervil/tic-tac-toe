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
  try {
    const total = await Game.countDocuments({ user1: 'player', user2: 'ia' });
    const playerWins = await Game.countDocuments({
      user1: 'player',
      user2: 'ia',
      winner: 'player'
    });
    const draws = await Game.countDocuments({
      user1: 'player',
      user2: 'ia',
      winner: null
    });
    const iaWins = await Game.countDocuments({
      user1: 'player',
      user2: 'ia',
      winner: 'ia'
    });

    return res.status(200).send({ total, playerWins, iaWins, draws });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/allgames', async (req, res) => {
  try {
    const result = await Game.find({ user1: 'player', user2: 'ia' });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Add new game
router.post('/games', async ({ body }, res) => {
  try {
    const validateGame = validateWithSchema(gameSchema, { ...body });

    if (validateGame.valid) {
      const result = await Game.create({ ...validateGame.data });

      return res.status(200).send(result);
    } else {
      return res.status(400).send(formatError(validateGame));
    }
  } catch (err) {
    return res.status(400).send(err);
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
        .send({ status: 'finished', winner: 'player', board });
    }

    // 3. IA play
    const newBoard = await iaPlay(board);

    // 4. Check IA won or draw
    winner = checkWinner(newBoard);

    if (winner) {
      return res
        .status(200)
        .send({ status: 'finished', winner: 'ia', board: newBoard });
    }

    // 6. Return new board, status: playing
    return res
      .status(200)
      .send({ status: 'Next player: X', winner: null, board: newBoard });
  } else {
    return res.status(400).send(formatError(validateBoard));
  }
});

export default router;
