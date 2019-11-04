import _ from 'lodash';
import { Request, Response } from 'express';

export default (req: Request, res: Response, next: Function) => {
  req.body = _.pickBy(req.body, (value) => value !== '');
  next();
};
