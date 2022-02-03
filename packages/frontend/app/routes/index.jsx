import styles from '../styles/index.css';

// Components
import Sign from '../components/Sign';
import Container from '../components/Container';
import Card from '../components/Card';
import Title from '../components/Title';
import Board from '../components/Board';

const Index = () => {
  return (
    <Container>
      <Card>
        <Title label='3 en Raya' />
        <Board />

        <Title label='👑 Last Games 👑' />
      </Card>
    </Container>
  );
};

export default Index;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
