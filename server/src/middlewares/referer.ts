import { Request, Response, NextFunction } from 'express';

export const refererCheck = (req: Request, res: Response, next: NextFunction) => { 
  if (req.headers.referer === 'http://localhost:3000/'){
    next();
  } else {
    res.status(403).send('Referer Error');
  }
}