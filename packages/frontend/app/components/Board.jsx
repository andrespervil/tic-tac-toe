import { useState } from 'react';
import { useLoaderData } from 'remix';

// Fetchers
import { getLastGames } from '../utils/fetchers';

const Board = () => {
  const [board, setBoard] = useState([...Array(9).keys()].map(() => ' '));
  const [left, setLeft] = useState(9);

  const handleCellClick = (cell, index) => {
    if (cell === ' ') {
      let newBoard = board.map((c, i) => (index === i ? 'X' : c));

      setBoard(newBoard);

      fetchNextTurn(board);
    }
  };

  let games = useLoaderData();

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
      <pre>{games || 'Sin datos'}</pre>
    </>
  );
};

export let loader = async () => {
  return getLastGames();
};

export default Board;
