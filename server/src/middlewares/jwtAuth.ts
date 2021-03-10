import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// Access Token
export const authenticateAceessToken = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt-access', {session: false} , (err: any, user: any, info: any) => {
      
      if(err) {
        console.error(err);
        next(err);
      }

      if(!user){
        // token 관련 에러가 여기로 온다.
        if(info.name === 'TokenExpiredError'){
          // access token이 만료된 경우 refresh 토큰 검증 후 재발급
          console.log('TokenExpiredError');
          return res.redirect('/api/auth/refresh');
        }
        if(info.message === 'No auth token'){
          // access token이 없는 경우 refresh 토큰 검증 후 재발급
          console.log('no auth token');
          return res.redirect('/api/auth/refresh');
        } else {
          return res.status(401).send(info.message);
        }
      }

      const { id, email, nickname, createdAt } = user;
      
      const data = {
        me: {
          id,
          email,
          nickname,
          createdAt
        },
        token: req.headers['Bearer']
      }

      req.user = data;
      console.log('Verifying access token - O.K')
      next();
    })(req, res, next);
}

// Refresh Token
export const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt-refresh', {session: false} , (err: any, user: any, info: any) => {
    
    if(err) {
      console.error(err);
      next(err);
    }

    if(!user){
      // token 관련 에러가 여기로 온다.
      if(info.name === 'TokenExpiredError'){
        return res.status(419).send('토큰이 만료되었습니다 다시 로그인해 주세요.');
      }
      console.log(info.message)
      return res.status(401).send(info.message);
    }

    const { id, email, nickname, createdAt, token } = user;

    // DB와 대조 logic
    if(req.cookies[process.env.REFRESH_TOKEN_NAME!] !== token) {
      console.log('최근 발급된 토큰이 아닙니다.');
      return res.status(401).send('최근 발급된 토큰이 아닙니다.');
    }
    
    const accessToken = jwt.sign({
      email,
    }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '30m',
      issuer: process.env.TOKEN_ISSUER
    });

    const data = {
      me: {
        id,
        email,
        nickname,
        createdAt
      },
      token: accessToken
    }

    req.user = data;

    next();
  })(req, res, next);
}