import { RequestHandler, Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

type Class = { new(...args: any[]): any; };

// eslint-disable-line arrow-body-style
const validationMiddleware = (type: Class): RequestHandler => {
  return async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
      await validateOrReject(plainToClass(type, req.body), {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: {
          target: false,
        },
      });
      next();
    } catch (errors) {
      res.status(400).type('txt').send(errors.join('\n'));
    }
  };
};

export default validationMiddleware;
