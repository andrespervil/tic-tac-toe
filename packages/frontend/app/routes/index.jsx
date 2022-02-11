import styles from '~/styles/index.css';
import boardStyles from '~/styles/board.css';

import React, { useState, useEffect } from 'react';

import { useLoaderData } from 'remix';

// Fetchers
import { getGamesResume, getNextTurn, saveGameResult } from '~/utils/fetchers';

// Components
import Container from '~/components/Container';
import Card from '~/components/Card';
import Title from '~/components/Title';
import Board from '~/components/Board';
import Rankings from '~/components/Rankings';
import GameResume from '~/components/GameResume';

const Index = () => {
  const [response, setResponse] = useState({ status: 'Next Player: X' });
  const [board, setBoard] = useState([...Array(9).keys()].map(() => ' '));
  const [games, setGames] = useState({});
  const [reload, setReload] = useState(false);

  const handleCellClick = async (cell, index) => {
    if (cell === ' ') {
      let newBoard = board.map((c, i) => (index === i ? 'X' : c));

      setBoard(newBoard);
      setResponse({ status: 'Next Player: O' });

      const res = await getNextTurn(newBoard);

      setResponse({ ...res });
      setBoard(res.board);

      if (res.status === 'finished') {
        // Save game to BBDD
        await saveGameResult(res.winner);
        // update last games

        setReload(!reload);
      }
    }
  };

  const handleRestartGame = async () => {
    setResponse({ status: 'Next Player: X' });
    setBoard([...Array(9).keys()].map(() => ' '));
  };

  useEffect(async () => {
    const data = await getGamesResume();

    setGames(data);
  }, [reload]);

  return (
    <Container>
      <Card>
        <Title label='3 en Raya' />

        {response.status !== 'finished' ? (
          <Board
            board={board}
            response={response}
            handleCellClick={handleCellClick}
          />
        ) : (
          <GameResume response={response} restartGame={handleRestartGame} />
        )}

        <Title label='Players vs IA stats' />
        {games && <Rankings {...games} />}
      </Card>
    </Container>
  );
};

export default Index;

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: boardStyles }
  ];
}
