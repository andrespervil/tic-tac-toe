import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    user1: {
      required: true,
      type: String
    },
    user2: {
      required: true,
      type: String
    },
    winner: {
      required: false,
      type: String
    }
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
