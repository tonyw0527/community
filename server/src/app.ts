import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport'
import passportConfig from './passport';
import APIRoutes from './routes/api';
import "reflect-metadata";
import {createConnection} from "typeorm";

import { getRepository } from 'typeorm';
import Snippet from './entity/Snippet';

dotenv.config();

// connect to mysql db
createConnection().then(async connection => {

  // initialize express app
  const app: express.Application = express();

  // logger
  app.use(morgan('dev'));

  // cors
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // send cookies to different domain
    optionsSuccessStatus: 200
  }));

  // parsers
  app.use(express.json()); // application/json 형태의 데이터 파싱
  app.use(express.urlencoded({extended: false})); // application/x-www-form-urlencoded 형태의 데이터 파싱
  app.use(cookieParser()); // cookie 파싱

  // set up passport
  passportConfig()
  app.use(passport.initialize());

  // set up routes
  app.use('/api', APIRoutes);

  app.use('/test', async (req, res) => {
    const userPosts = await getRepository(Snippet).find();
    res.status(200).json(userPosts)
  })

  // handling 404
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    next(err);
  })

  // start server
  app.listen(process.env.PORT || 3001, () => {
    console.log('node_env', process.env.NODE_ENV);
    console.log(`Server is running on ${process.env.PORT || 3001} now!`);
  });

}).catch(error => console.log(error));