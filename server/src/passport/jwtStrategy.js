require('dotenv').config();
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor = function(req) {

    let token = null;

    if(req && req.cookies) {
        token = req.cookies[process.env.TOKEN_COOKIE_NAME];
    }
    
    return token;
};

const { User } = require('../models');

module.exports = () => {

    passport.use(new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, async (jwtPayload, done) => {
        console.log('jwt strategy');
        console.log(jwtPayload);
        const { email } = jwtPayload;

        try {
          const exUser = await User.findOne({ where: { email }});
          
          if(exUser) {
            return done(null, exUser);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        } catch (error) {
          console.error(error);
          done(error, false);
        }
    }));
}