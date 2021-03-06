import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: any, res: any, next: any) => {
    console.log('start auth middleware');

    passport.authenticate('jwt', {session: false}
    ,(err: any, user: any, info: any) => {
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

      console.log('토큰 인증 성공')
      next();
    })(req, res, next);

}

export default authMiddleware;