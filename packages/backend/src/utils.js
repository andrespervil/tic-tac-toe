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
  WIN_OPTIONS.every(option => {
    const [a, b, c] = option;
    if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  });

  if (board.filter(cell => cell === ' ').length === 0) {
    return 'draw';
  }

  return false;
};

// Recieve some array, and return a 'random' move from it
const getShuffledMoveFromConst = (array, board) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);

  shuffledArray.every(corner => {
    if (board[corner] === ' ') {
      board[corner] = 'O';
      return false;
    } else {
      return true;
    }
  });

  return board;
};

const iaPlay = board => {
  let hasPlayed = false;

  // 1. Try to block X play

  WIN_OPTIONS.every(option => {
    const [a, b, c] = option;

    if (board[a] === 'X' && board[b] === 'X' && board[c] === ' ') {
      board[c] = 'O';
      return board;
    }
    if (board[b] === 'X' && board[c] === 'X' && board[a] === ' ') {
      board[a] = 'O';
      return board;
    }
    if (board[a] === 'X' && board[c] === 'X' && board[b] === ' ') {
      board[b] = 'O';
      return board;
    }
  });

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
