const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
require('dotenv').config();

const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME;
const anMonth = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
const cookieOptions = {expires: anMonth, httpOnly: true, secure: false }; // set secure to true in production
const { User } = require('../../../models');

exports.login = (req, res) => {
  console.log(req.body);

    passport.authenticate('local', {session: false}
    ,(err, user) => {
        if(err || !user) {
            console.log('here');
            console.log(err);
            console.log(user);
            return res.status(400).json({
                message: 'Seomthing is not right',
                user: user
            });
        }
        
        const { id, email, nickname, provider, createdAt  } = user;
        
        if(req.body.isKeepLogin) {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '30 days'});
            res.cookie(TOKEN_COOKIE_NAME, token, cookieOptions);
        } else {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1 days'});
            // session cookie
            res.cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true, secure: false });
        }
        
        return res.status(200).json({
          user: {
            id,
            email,
            nickname,
            provider,
            createdAt,
          }
        });
    })(req, res); // 미들웨어 내의 미들웨는 (req, res, next)를 붙임.
};

exports.logout = (req, res) => {
    // destroy token
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.json('logout');
    console.log('logout');
}

exports.register = async (req, res) => {
    const { email, password, nickname } = req.body;
    console.log(req.body);
    try {
      const exUser = await User.findOne({ where: { email }});

      if(exUser) {
        res.status(400).json({ message: '이미 등록된 email 입니다.' });
      }

      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nickname,
        password: hash,
      });
      res.status(200).json({ message: '회원가입 완료'})
    } catch(error) {
      console.error(error);
      next(error);
    }
};