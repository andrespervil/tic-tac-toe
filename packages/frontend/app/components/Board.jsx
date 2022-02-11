import { useState } from 'react';
import { useActionData } from 'remix';

import axios from 'axios';

import Container from './Container';

const Board = ({ board, response, handleCellClick }) => {
  return (
    <Container>
      <div className='status'>
        <h2>{response.status}</h2>
      </div>
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
    </Container>
  );
};

export default Board;
