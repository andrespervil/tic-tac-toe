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
  for (let i = 0; i < 3; i++) {
    if (
      board[(i + 1) * 3 - 3] === board[(i + 1) * 3 - 2] &&
      board[(i + 1) * 3 - 3] === board[(i + 1) * 3 - 1] &&
      board[(i + 1) * 3 - 3] !== ' '
    ) {
      return board[(i + 1) * 3 - 3];
    }

    if (
      board[i] === board[i + 3] &&
      board[i] === board[i + 6] &&
      board[i] !== ' '
    ) {
      return board[i];
    }

    if (board[0] === board[4] && board[0] === board[8] && board[0] !== ' ') {
      return board[0];
    }

    if (board[2] === board[4] && board[2] === board[6] && board[2] !== ' ') {
      return board[2];
    }
  }
  return false;
};

const iaPlay = board => {
  return board;
};

export { validateWithSchema, formatError, checkWinner, iaPlay };
