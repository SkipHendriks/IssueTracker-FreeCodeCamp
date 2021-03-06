import { RequestHandler, Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

type Class = { new(...args: any[]): any; };

const validationMiddleware = (type: Class): RequestHandler => (
  async (req: Request, res: Response, next: Function): Promise<void> => {
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
      res.status(400).json(errors);
    }
  }
);

export default validationMiddleware;
