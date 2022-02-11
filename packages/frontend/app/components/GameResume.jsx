const GameResume = ({ response: { winner, status }, restartGame }) => {
  return (
    <div className='resume'>
      <h3>{status} 🚩</h3>

      <h2>{winner ? `Player '${winner}' Won!` : 'Its a DRAW'}</h2>

      <button onClick={() => restartGame()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          width={30}
          height={30}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          />
        </svg>
      </button>
    </div>
  );
};

export default GameResume;
