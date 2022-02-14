import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    winner: {
      required: false,
      type: String
    }
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
