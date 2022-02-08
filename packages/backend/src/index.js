import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import models, { connectDb } from './models/index.js';

// Express routes
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(cors());

// Config router
app.use('/api', routes);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`💥 Server listening on port ${process.env.PORT} `)
  );
});
