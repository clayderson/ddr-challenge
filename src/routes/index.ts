import { readdirSync } from 'fs';
import { Router } from 'express';

const router = Router();

export default () => {
  for (const filename of readdirSync(__dirname)) {
    if (!/^index/i.test(filename)) {
      (async () => {
        (await import(`./${filename}`)).default(router);
      })();
    }
  }

  return router;
};
