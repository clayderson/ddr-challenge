import debug from 'debug';
import { Router, Request, Response } from 'express';
import { sanitize } from 'indicative/sanitizer';
import { validateAll } from 'indicative/validator';
import Tabulation from '../models/Tabulation';

const logger = debug('challenge:tabulations');

export default (router: Router) => {
  router.post('/tabulations', async (request: Request, response: Response) => {
    const sanitizeRules = {
      clientName: 'trim',
      binedPhone: 'trim',
      accessPhone: 'trim',
      protocol: 'trim',
      calledAt: 'trim',
    };

    const rules = {
      clientName: 'required',
      binedPhone: 'required|min:10|max:11',
      accessPhone: 'required|min:10|max:11',
      protocol: 'required|alpha_numeric',
      calledAt: 'required|date',
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

    const protocolExists = await Tabulation.findOne({
      protocol: params.protocol,
    });

    if (protocolExists) {
      response.status(400).json({
        protocol: 'O protocolo informado já existe na base de dados',
      });

      return;
    }

    try {
      response.json(await Tabulation.create(request.body));
    } catch (err) {
      logger(err);

      response.status(500).json({
        message: 'Algo não saiu como esperado',
      });
    }
  });
};
