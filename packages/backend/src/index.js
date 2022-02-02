import express from 'express';
import 'dotenv/config';

import models, { connectDb } from './models/index.js';

// Express routes
import routes from './routes.js';

const app = express();
app.use(express.json());

// Config router
app.use('/api', routes);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`💥 Server listening on port ${process.env.PORT} `)
  );
});
