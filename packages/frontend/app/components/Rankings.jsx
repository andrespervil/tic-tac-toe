const Rankings = ({ games }) => {
  return (
    <ol className='rankings'>
      {games.map(game => (
        <li key={game.id}> {game.winner} </li>
      ))}
    </ol>
  );
};

export default Rankings;
