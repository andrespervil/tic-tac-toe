import { checkWinner, iaPlay } from '../utils.js';
import { WIN_OPTIONS, CORNERS, MID_SIDE } from '../consts.js';

describe('Test Checkwinner', () => {
  test('Check win options with both players', () => {
    WIN_OPTIONS.map(winOption => {
      const [a, b, c] = winOption;

      const board = [...Array(9).keys()].map(() => ' ');

      board[a] = 'X';
      board[b] = 'X';
      board[c] = 'X';

      expect(checkWinner(board)).toEqual('X');

      board[a] = 'O';
      board[b] = 'O';
      board[c] = 'O';

      expect(checkWinner(board)).toEqual('O');
    });
  });

  test('Check draw', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];

    expect(checkWinner(board)).toEqual('draw');
  });
});

describe('Test IaPlay', () => {
  test('IA should play middle', () => {
    const board = ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const result = iaPlay(board);

    expect(result[4]).toEqual('O');
  });

  test('IA should play', () => {
    const board = [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '];
    const result = iaPlay(board);

    expect(result.find(cell => (cell = 'O')).length).toEqual(1);
  });

  test('IA Should try to win', () => {
    WIN_OPTIONS.map(winOption => {
      const [a, b, c] = winOption;

      const board = [...Array(9).keys()].map(() => ' ');

      board[a] = 'O';
      board[b] = 'O';

      expect(iaPlay(board)[c]).toEqual('O');

      board[a] = ' ';
      board[b] = 'O';
      board[c] = 'O';

      expect(iaPlay(board)[a]).toEqual('O');

      board[a] = 'O';
      board[b] = ' ';
      board[c] = 'O';

      expect(iaPlay(board)[b]).toEqual('O');
    });
  });

  test('IA Should block player win', () => {
    WIN_OPTIONS.map(winOption => {
      const [a, b, c] = winOption;

      const board = [...Array(9).keys()].map(() => ' ');

      board[a] = 'X';
      board[b] = 'X';

      expect(iaPlay(board)[c]).toEqual('O');

      board[a] = ' ';
      board[b] = 'X';
      board[c] = 'X';

      expect(iaPlay(board)[a]).toEqual('O');

      board[a] = 'X';
      board[b] = ' ';
      board[c] = 'X';

      expect(iaPlay(board)[b]).toEqual('O');
    });
  });

  test('IA Should try to win before block player', () => {
    const board = ['X', 'X', ' ', 'O', 'O', ' ', ' ', ' ', 'X'];

    expect(iaPlay(board)[5]).toEqual('O');
  });
});
