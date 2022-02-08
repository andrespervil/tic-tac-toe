import axios from 'axios';

async function getLastGames() {
  let res = await axios.get('/games');
  return res.data;
}
async function getNextTurn(board) {
  let res = await axios.post('/game/userPlay', { board });
  return res.data;
}

export { getLastGames, getNextTurn };
