const passport = require('passport');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    console.log('start auth middleware');

    passport.authenticate('jwt', {session: false}
    ,(err, user, info) => {
        if(info){
            if(info.name === 'TokenExpiredError'){
                console.log('토큰 만료');
                return res.status(419).json({
                    message: 'token expired. please login again',
                    user: user
                });
            }
        }

        if(err || !user) {
            console.log('토큰 인증 실패');
            return res.status(401).json({
                message: 'Something is not right',
                user: user
            });
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

module.exports = authMiddleware