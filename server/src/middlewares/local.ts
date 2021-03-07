import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME;
const anMonth = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
const cookieOptions = {expires: anMonth, httpOnly: true, secure: false }; // set secure to true in production

const localAuthMiddleware = (req: Request, res: Response, next: NextFunction) => { 
  
  passport.authenticate('local', {session: false} ,(err: any, user: any, info: any) => {
  
    if(err) {
      console.error(err);
      next(err);
    }
    
    if(!user) {
      return res.status(401).send(info.message);
    }
    
    const { id, email, nickname, provider, createdAt } = user;
    
    if(req.body.isAutoLogin) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET!, { expiresIn: '30 days'});
        res.cookie(TOKEN_COOKIE_NAME!, token, cookieOptions);
    } else {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET!, { expiresIn: '1 days'});
        // session cookie
        res.cookie(TOKEN_COOKIE_NAME!, token, { httpOnly: true, secure: false });
    }
    
    return res.status(200).json({
      me: {
        id,
        email,
        nickname,
        provider,
        createdAt,
      }
    });
  })(req, res, next);
}

export default localAuthMiddleware;