import { Request, Response, NextFunction } from 'express';

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
  res.status(err.status || 500);
}