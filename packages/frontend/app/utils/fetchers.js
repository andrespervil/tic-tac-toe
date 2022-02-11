import axios from 'axios';

const getGamesResume = async () => {
  let res = await axios.get('/games');
  return res.data;
};
const getNextTurn = async board => {
  let res = await axios.post('/game/userPlay', { board });
  return res.data;
};

const saveGameResult = async winner => {
  let res = await axios.post('/games', {
    user1: 'player',
    user2: 'ia',
    winner
  });
  return res.data;
};

export { getGamesResume, getNextTurn, saveGameResult };
