import mongoose from 'mongoose';

// Import models
import Game from './models/game.js';

import { connectDb } from './db-conn.js';

const models = { Game };

export { connectDb };

export default models;
