import express from 'express';
import * as AuthControlloer from './auth.controller';
import localAuthMiddleware from '../../../middlewares/local';
import jwtAuthMiddleware from '../../../middlewares/jwt';

const router = express.Router();

router.post('/login', localAuthMiddleware, AuthControlloer.login);
router.get('/user', jwtAuthMiddleware, AuthControlloer.user);
router.post('/register', AuthControlloer.register);
router.get('/logout', AuthControlloer.logout);

export default router;