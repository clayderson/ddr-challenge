import debug from 'debug';
import { Router, Request, Response } from 'express';
import Matching from '../models/Matching';

const logger = debug('challenge:matchings');

export default (router: Router) => {
  router.get('/matchings', async (request: Request, response: Response) => {
    try {
      response.json({
        data: await Matching.find().populate(['recording', 'tabulation']),
      });
    } catch (err) {
      logger(err);

      response.status(500).json({
        message: 'Algo não saiu como esperado',
      });
    }
  });
};
