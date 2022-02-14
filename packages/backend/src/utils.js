import { WIN_OPTIONS, CORNERS, MID_SIDE } from './consts.js';

const validateWithSchema = (schema, data) => {
  try {
    return {
      valid: true,
      data: schema.validateSync(data, {
        abortEarly: false,
        stripUnknown: true
      })
    };
  } catch (err) {
    return { valid: false, data: err.inner };
  }
};

const formatError = error => {
  return {
    errors: error.data.map(error => error.message),
    message: 'Validation error, Board was not saved'
  };
};

const checkWinner = board => {
  let winner = null;

  WIN_OPTIONS.every(option => {
    const [a, b, c] = option;
    if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return false;
    } else {
      return true;
    }
  });

  if (winner) {
    return winner;
  }
  if (!winner && board.filter(cell => cell === ' ').length === 0) {
    return 'draw';
  }

  return false;
};

// Recieve some array, and return a 'random' move from it
const getShuffledMoveFromConst = (array, board) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);

  let touched = false;

  shuffledArray.every(corner => {
    if (board[corner] === ' ' && !touched) {
      board[corner] = 'O';
      touched = true;
      return false;
    } else {
      return true;
    }
  });

  return board;
};

const calculateBestMove = (board, obj, player) => {
  let touched = false;

  WIN_OPTIONS.every(option => {
    const [a, b, c] = option;

    if (board[a] === obj && board[b] === obj && board[c] === ' ' && !touched) {
      board[c] = player;
      touched = true;
      return false;
    }
    if (board[b] === obj && board[c] === obj && board[a] === ' ' && !touched) {
      board[a] = player;
      touched = true;
      return false;
    }
    if (board[a] === obj && board[c] === obj && board[b] === ' ' && !touched) {
      board[b] = player;
      touched = true;
      return false;
    }

    return true;
  });

  return touched ? board : null;
};

const iaPlay = board => {
  let touched = false;

  // 1. Try to win
  let bestMove = calculateBestMove(board, 'O', 'O');

  if (bestMove) {
    return bestMove;
  }

  // 2. Try to block X play
  bestMove = calculateBestMove(board, 'X', 'O');

  if (bestMove) {
    return bestMove;
  }

  // 2. Take center if available

  if (board[4] === ' ') {
    board[4] = 'O';
    return board;
  }

  // 3. Take one of the corners if is available
  if (CORNERS.some(corner => board[corner] === ' ')) {
    return getShuffledMoveFromConst(CORNERS, board);
  }

  // 4. Take one of the sides if is available
  if (MID_SIDE.some(corner => board[corner] === ' ')) {
    return getShuffledMoveFromConst(MID_SIDE, board);
  }
};

export { validateWithSchema, formatError, checkWinner, iaPlay };
