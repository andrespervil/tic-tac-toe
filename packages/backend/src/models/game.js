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
      required: true,
      type: String
    },
    resume: {
      required: true,
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
