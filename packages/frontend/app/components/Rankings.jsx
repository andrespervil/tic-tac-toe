const Rankings = ({ total, playerWins, iaWins, draws }) => {
  return (
    <div className='rankings'>
      <h3>Total Games: {total}</h3>
      <h4>Player Won: {playerWins}</h4>
      <h4>IA Won: {iaWins}</h4>
      <h4>Draws: {draws}</h4>
    </div>
  );
};

export default Rankings;
