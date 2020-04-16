import debug from 'debug';
import { Router, Request, Response } from 'express';
import { sanitize } from 'indicative/sanitizer';
import { validateAll } from 'indicative/validator';
import Tabulacao from '../models/Tabulacao';

const logger = debug('challenge:tabulations');

export default (router: Router) => {
  router.post('/tabulations', async (request: Request, response: Response) => {
    const sanitizeRules = {
      nomeCliente: 'trim',
      numeroBinado: 'trim',
      numeroAcesso: 'trim',
      protocolo: 'trim',
      dataAtendimento: 'trim',
    };

    const rules = {
      nomeCliente: 'required',
      numeroBinado: 'required',
      numeroAcesso: 'required',
      protocolo: 'required',
      dataAtendimento: 'required',
    };

    const messages = {
      required: 'Este parâmetro é obrigatório',
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

    if (!Date.parse(params.dataAtendimento)) {
      response.status(400).json({
        dataAtendimento: 'Este parâmetro requer uma data válida',
      });

      return;
    }

    const protocolExists = await Tabulacao.findOne({
      protocolo: params.protocolo,
    });

    if (protocolExists) {
      response.status(400).json({
        protocolo: 'O protocolo informado já existe na base de dados',
      });

      return;
    }

    try {
      response.json(
        await Tabulacao.create(request.body),
      );
    } catch (err) {
      logger(err);

      response.status(500).json({
        message: 'Algo não saiu como esperado',
      });
    }
  });
};
