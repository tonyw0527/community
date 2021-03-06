import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../../../models';

dotenv.config();

const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME;
const anMonth = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
const cookieOptions = {expires: anMonth, httpOnly: true, secure: false }; // set secure to true in production

export const login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);

    passport.authenticate('local', {session: false}
    ,(err: any, user: any, info: any) => {
        if(err) {
          console.error(err);
          next(err);
        }
        
        if(!user) {
          res.status(401).send(info.message);
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
        
        res.status(200).json({
          me: {
            id,
            email,
            nickname,
            provider,
            createdAt,
          }
        });
    })(req, res, next); // 미들웨어 내의 미들웨어는 (req, res, next)를 붙임.
};

export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password, nickname } = req.body;
    console.log(req.body);
    try {
      const exUser = await User.findOne({ where: { email }});

      if(exUser) {
        res.status(403).send('이미 등록된 email 입니다.');
      }

      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nickname,
        password: hash,
      });
      res.status(200).send('회원가입 완료');
    } catch(error) {
      console.error(error);
      next(error);
    }
};

export const logout = (req: express.Request, res: express.Response) => {
  // destroy token
  res.clearCookie(TOKEN_COOKIE_NAME!);
  res.status(200).send('로그아웃 되었습니다.');
};

export const user = (req: any, res: express.Response) => {
  if(req.user) {
    res.status(200).json({
      me: req.user
    });
  }
}