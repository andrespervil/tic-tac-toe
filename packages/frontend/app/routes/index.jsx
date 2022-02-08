import styles from '../styles/index.css';

import React, { useState } from 'react';

import { useLoaderData } from 'remix';

// Fetchers
import { getLastGames } from '../utils/fetchers';

// Components
import Sign from '../components/Sign';
import Container from '../components/Container';
import Card from '../components/Card';
import Title from '../components/Title';
import Board from '../components/Board';
import Rankings from '../components/Rankings';

const Index = () => {
  let games = useLoaderData();

  return (
    <Container>
      <Card>
        <Title label='3 en Raya' />

        <Board />
        <Title label='👑 Last Games 👑' />
        {games && games.length > 1 && <Rankings games={games} />}
      </Card>
    </Container>
  );
};

export default Index;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export function loader() {
  return null;
}
