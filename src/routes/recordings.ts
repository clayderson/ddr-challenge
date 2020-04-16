import debug from 'debug';
import { Router, Request, Response } from 'express';
import { sanitize } from 'indicative/sanitizer';
import { validateAll } from 'indicative/validator';
import Recording from '../models/Recording';

const logger = debug('challenge:recordings');

export default (router: Router) => {
  router.post('/recordings', async (request: Request, response: Response) => {
    const sanitizeRules = {
      phone: 'trim',
      branch: 'trim',
      recordedAt: 'trim',
    };

    const rules = {
      phone: 'required|min:10|max:11',
      branch: 'required|alpha_numeric',
      recordedAt: 'required|date',
    };

    const messages = {
      required: 'Este campo é obrigatório',
      alpha_numeric: 'Este campo aceita apenas caracteres alfanuméricos',
      date: 'Este campo deve ser parseável para o formato de data',
    };

    const params = sanitize(request.body, sanitizeRules);

    try {
      await validateAll(params, rules, messages);
    } catch (err) {
      const errors = {};

      interface Error {
        message: string,
        validation: string,
        field: string,
      };

      err.map((item: Error) => {
        Object.assign(errors, {
          [item.field]: item.message,
        });
      });

      response.status(400).json(errors);
      return;
    }

    try {
      response.json(await Recording.create(request.body));
    } catch (err) {
      logger(err);

      response.status(500).json({
        message: 'Algo não saiu como esperado',
      });
    }
  });
};
