import axios from 'axios';

export async function getLastGames() {
  let res = await axios.get(`${process.env.API_URL}/games`);
  return res;
}
