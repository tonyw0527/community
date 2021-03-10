import dotenv from 'dotenv';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from '../models';

dotenv.config();

const JWTStrategy = passportJWT.Strategy

const cookieExtractor = function(req: any) {

    let token = null;

    if(req && req.cookies) {
        token = req.cookies[process.env.REFRESH_TOKEN_NAME!];
    }
    
    return token;
};

const ExtractJWT = passportJWT.ExtractJwt;

export const jwtForAccess = () => {

    passport.use('jwt-access', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        issuer: process.env.TOKEN_ISSUER
    }, async (jwtPayload: any, done: any) => {
        const { email } = jwtPayload;

        try {
          const exUser = await User.findOne({ where: { email }});
          
          if(exUser) {
            done(null, exUser);
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.'});
            // 토큰 secret은 맞는데 해당 email이 없다?
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
    }));
}

export const jwtForRefresh = () => {

  passport.use('jwt-refresh', new JWTStrategy({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      issuer: process.env.TOKEN_ISSUER
  }, async (jwtPayload: any, done: any) => {
      const { email } = jwtPayload;

      try {
        const exUser = await User.findOne({ where: { email }});
        
        if(exUser) {
          done(null, exUser);
        } else {
          done(null, false, { message: '가입되지 않은 회원입니다.'});
          // 토큰 secret은 맞는데 해당 email이 없다?
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
  }));
}