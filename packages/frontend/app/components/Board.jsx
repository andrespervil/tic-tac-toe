import { useState } from 'react';
import { useActionData } from 'remix';

import axios from 'axios';

import { getNextTurn } from '../utils/fetchers';

const Board = () => {
  const [board, setBoard] = useState([...Array(9).keys()].map(() => ' '));
  const [status, setStatus] = useState('Next player: X');

  const handleCellClick = async (cell, index) => {
    if (cell === ' ') {
      let newBoard = board.map((c, i) => (index === i ? 'X' : c));
      setBoard(newBoard);

      const response = await getNextTurn(newBoard);

      console.log(response);

      if (response.status === 'win') {
        // Handle WIN
      }

      setStatus(response.status);
      setBoard(response.board);
    }
  };

  return (
    <>
      <div className='board'>
        {board &&
          board.length === 9 &&
          board.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleCellClick(cell, index)}
              role='button'
            >
              <h2>{cell}</h2>
            </div>
          ))}
      </div>
    </>
  );
};

export default Board;
