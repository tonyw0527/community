import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('jwt', {session: false} ,(err: any, user: any, info: any) => {
      
      if(err) {
        console.error(err);
        next(err);
      }

      if(!user){
        // token 관련 에러가 여기로 온다.
        if(info.name === 'TokenExpiredError'){
          return res.status(419).send('토큰이 만료되었습니다 다시 로그인해 주세요.');
        }
        return res.status(401).send(info.message);
      }

      const { id, email, nickname, provider, createdAt } = user;
      
      const userDataWithoutPassword = {
        id,
        email,
        nickname,
        provider,
        createdAt
      }
      req.user = userDataWithoutPassword;

      next();
    })(req, res, next);

}

export default jwtAuthMiddleware;