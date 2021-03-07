import dotenv from 'dotenv';
import { Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../models';

dotenv.config();

const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME;

export const login = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
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

export const logout = (req: Request, res: Response) => {
  // destroy token
  res.clearCookie(TOKEN_COOKIE_NAME!);
  res.status(200).send('로그아웃 되었습니다.');
};

export const user = (req: any, res: Response) => {
  if(req.user) {
    res.status(200).json({
      me: req.user
    });
  }
}