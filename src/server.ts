require('dotenv').config();

import debug from 'debug';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes';
import tasks from './util/tasks';

const logger = debug('challenge:server');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(routes());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger(`Server listening on port ${port}`);
  tasks.run();
});
