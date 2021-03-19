import { Request, Response, NextFunction } from 'express';

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
}