import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

dotenv.config();

const localAuth = (req: any, res: Response, next: NextFunction) => { 
  
  passport.authenticate('local', {session: false} , (err: any, user: any, info: any) => {
  
    if(err) {
      console.error(err);
      next(err);
    }
    
    if(!user) {
      return res.status(401).send(info.message);
    }
    
    const { id, email, nickname, createdAt } = user;
    
    const accessToken = jwt.sign({
      email,
    }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '30m',
      issuer: process.env.TOKEN_ISSUER
    });

    const refreshToken = jwt.sign({
      email 
    }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '14d',
      issuer: process.env.TOKEN_ISSUER
    });

    const me = {
      id,
      email,
      nickname,
      createdAt
    };
    

    req.user = me;
    req.tokens = {
      accessToken,
      refreshToken
    }

    next();

  })(req, res, next);
}

export default localAuth;