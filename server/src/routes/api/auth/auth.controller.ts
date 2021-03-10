import dotenv from 'dotenv';
import { Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../models';
import jwt from 'jsonwebtoken';

dotenv.config();

const register = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password, nickname } = req.body;
  
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
  } catch(err) {
    console.error(err);
    next(err);
  }
};

const login = (req: any, res: Response, next: NextFunction) => {
  if(req.user) {
    const { email } = req.user;
    const { accessToken, refreshToken } = req.tokens;

    // save refresh token in DB
    try {
      User.update( { token: refreshToken }, { where: { email }});
    } catch (err) {
      console.log(err);
      next(err);
    }

    // send refresh token by cookie
    res.cookie(process.env.REFRESH_TOKEN_NAME!, refreshToken, {
      expires: req.body.isAutoLogin ? expiresInDays(14) : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false
    });

    // send access token by json
    res.status(200).json({
      me: req.user,
      token: accessToken
    });
  }
};

const check = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(req.user);
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  
  jwt.verify(req.cookies[process.env.REFRESH_TOKEN_NAME!], process.env.REFRESH_TOKEN_SECRET!, (err: any, payload: any) => {
    let email = '';
    
    if(err) {
      console.error(err);
      if(err.name === 'TokenExpiredError'){
        const payload = jwt.decode(req.cookies[process.env.REFRESH_TOKEN_NAME!]) as any;
        email = payload.email;
      }
    } else {
      email = payload.email;
    }

    // destroy refresh token in DB
    try {
      User.update( { token: null }, { where: { email }});
    } catch (err) {
      console.log(err);
      next(err);
    }
  })

  res.clearCookie(process.env.REFRESH_TOKEN_NAME!);
  res.status(200).send('로그아웃 되었습니다.');
};

const refresh = (req: any, res: Response) => {
  res.status(200).json(req.user);
}

export { register, login, check, logout, refresh };

const expiresInDays = (days: number) => {
  return new Date(Date.now() + (1000 * 60 * 60 * 24 * days));
}