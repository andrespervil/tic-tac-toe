import mongoose from 'mongoose';

import Game from './game.js';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });
};

const models = { Game };

export { connectDb };

export default models;
