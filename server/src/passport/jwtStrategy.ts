import dotenv from 'dotenv';
import passport from 'passport';
import passportjwt from 'passport-jwt';
import { User } from '../models';

dotenv.config();

const JWTStrategy = passportjwt.Strategy
// const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor = function(req: any) {

    let token = null;

    if(req && req.cookies) {
        token = req.cookies[process.env.TOKEN_COOKIE_NAME!];
    }
    
    return token;
};

const jwt = () => {

    passport.use(new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, async (jwtPayload: any, done: any) => {
        console.log(jwtPayload);
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

export default jwt;