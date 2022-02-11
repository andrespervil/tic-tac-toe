import { validateWithSchema } from '../utils.js';

import { gameSchema, boardSchema } from '../yup.js';

describe('Test gameSchema', () => {
  test('Empty Invalid game', () => {
    const test = {};

    const result = validateWithSchema(gameSchema, test);

    // Pasando un array vacio, deberia retornar que user1 y user2 son requeridos
    expect(result.data.length).toEqual(2);
    expect(result.valid).toEqual(false);
  });

  test('Game with incorrect winner', () => {
    const test = {
      user1: 'player',
      user2: 'ia',
      winner: 'test'
    };

    const result = validateWithSchema(gameSchema, test);

    // Pasando un array vacio, deberia invalido
    expect(result.data.length).toEqual(1);
    expect(result.valid).toEqual(false);
  });

  test('Valid DRAW', () => {
    const test = {
      user1: 'player',
      user2: 'ia',
      winner: null
    };

    const result = validateWithSchema(gameSchema, test);

    // Pasando los datos correctos, retorna que es valido
    expect(result.data).toEqual(test);
    expect(result.valid).toEqual(true);
  });

  test('Valid player win', () => {
    const test = {
      user1: 'player',
      user2: 'ia',
      winner: 'player'
    };

    const result = validateWithSchema(gameSchema, test);

    // Pasando los datos correctos, retorna que es valido
    expect(result.data).toEqual(test);
    expect(result.valid).toEqual(true);
  });

  test('Valid ia win', () => {
    const test = {
      user1: 'player',
      user2: 'ia',
      winner: 'ia'
    };

    const result = validateWithSchema(gameSchema, test);

    // Pasando los datos correctos, retorna que es valido
    expect(result.data).toEqual(test);
    expect(result.valid).toEqual(true);
  });
});

describe('Test boardSchema', () => {
  const invalidBoards = [
    [], // Vacio
    ['', '', '', '', '', '', ''], // Longitud menor a 9
    ['', '', '', '', '', '', '', '', ''], // Logintud 9, pero campos incorrectos
    [' ', '', ' ', 'P', '', 'X', '', '', ''], // Logitud 9, pero campos incorrectos
    ['', '', '', '', '', '', '', '', '', ''] // Logitud mayor a 9
  ];

  const validBoards = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', 'O', ' ', ' ', 'X', ' ', ' ', 'X', 'O']
  ];

  test('Test invalid boards', () => {
    invalidBoards.forEach(board => {
      const result = validateWithSchema(boardSchema, board);

      expect(result.valid).toBe(false);
    });
  });

  test('Test valid boards', () => {
    validBoards.forEach(board => {
      const result = validateWithSchema(boardSchema, board);

      expect(result.valid).toBe(true);
    });
  });
});
