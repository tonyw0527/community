import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { sequelize } from './models';

const cookieParser = require('cookie-parser');

const passport = require('passport');
const passportConfig = require('./passport');

dotenv.config();
const app: express.Application = express();
app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: false })
.then(() => {
  console.log('DB 연결 성공');
})
.catch((err: any) => {
  console.error(err);
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(morgan('dev'));

// Parsers
app.use(express.json()); // application/json 형태의 데이터 파싱
app.use(express.urlencoded({extended: false})); // application/x-www-form-urlencoded 형태의 데이터 parsing
app.use(cookieParser()); // 쿠키 파싱

// Passport
passportConfig()
app.use(passport.initialize());

// Routing
app.use('/api', require('./routes/api'));

interface Error extends globalThis.Error {
  status?: number;
}

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error: Error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')} now!`);
});