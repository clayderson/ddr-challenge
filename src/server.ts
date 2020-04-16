require('dotenv').config();

import debug from 'debug';
import express from 'express';
import helmet from 'helmet';

const logger = debug('challenge:server');
const app = express();

app.use(helmet());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger(`Server listening on port ${port}`);
});
