import debug from 'debug';
import { Router, Request, Response } from 'express';
import Matching from '../models/Matching';

const logger = debug('challenge:matchings');

export default (router: Router) => {
  router.get('/matchings', async (request: Request, response: Response) => {
    const { select } = request.query;

    let page = parseInt(
      request.query.page ? request.query.page.toString() : '0', 10
    );

    let limit = parseInt(
      request.query.limit ? request.query.limit.toString() : '0', 10
    );

    if (page < 1) {
      page = 1;
    }

    if (limit < 1 || limit > 100) {
      limit = 100;
    }

    const total = await Matching.estimatedDocumentCount();
    const totalPages = Math.round(total / limit) >= 1 ? Math.round(total / limit) : 1;

    const matchings = await Matching
      .find()
      .populate('recording', select)
      .populate('tabulation', select)
      .select(select)
      .skip(limit * (page - 1))
      .limit(limit);

    try {
      response.json({
        total,
        pages: totalPages,
        currentPage: page,
        data: matchings,
      });
    } catch (err) {
      logger(err);

      response.status(500).json({
        message: 'Algo não saiu como esperado',
      });
    }
  });
};
