import { useState } from 'react';

const Board = () => {
  const [board, setBoard] = useState([...Array(9).keys()].map(() => null));
  const [left, setLeft] = useState(9);

  const iaPlay = updatedBoard => {
    let index = null;

    do {
      index = Math.floor(Math.random() * 10);
    } while (updatedBoard[index] !== null);

    const newBoard = updatedBoard.map((c, i) => (i === index ? 'O' : c));

    return newBoard;
  };

  const checkGameFinish = (newBoard, leftCopy) => {
    console.log('check rows');

    for (let i = 0; i < 3; i++) {
      // check rows
      console.log((i + 1) * 3 - 3, (i + 1) * 3 - 2, (i + 1) * 3 - 1);
    }

    console.log('check columns');

    for (let i = 0; i < 3; i++) {
      // check columns
      console.log(i, i + 3, i + 6);
    }

    // check diagonals

    return { board, leftCopy };
  };

  const handleCellClick = (cell, index) => {
    if (cell === null) {
      let newBoard = board.map((c, i) => (index === i ? 'X' : c));

      let leftCopy = left - 1;

      if (leftCopy !== 0) {
        newBoard = iaPlay(newBoard);
        leftCopy -= 1;
      }

      setBoard(newBoard);
      setLeft(leftCopy);

      checkGameFinish(newBoard, leftCopy);
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
              style={{ fontSize: '30px' }}
            >
              {cell !== 0 ? index : null}
            </div>
          ))}
      </div>
    </>
  );
};

export default Board;
