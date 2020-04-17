require('dotenv').config();

import recordings from './recordings.test';
import tabulations from './tabulations.test';
import matchings from './matchings.test';

describe('Recordings', recordings);
describe('Tabulations', tabulations);
describe('Matchings', matchings);
