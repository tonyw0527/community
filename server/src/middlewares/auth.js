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
                message: 'Seomthing is not right',
                user: user
            });
        }
        console.log('토큰 인증 성공')
        next();
        
        return res.status(200).json({
            message: 'token access allow'
        })
    })(req, res, next);

}

module.exports = authMiddleware