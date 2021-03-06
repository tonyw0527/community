import express from 'express';
import * as AuthControlloer from './auth.controller';
import authMiddleware from '../../../middlewares/auth';

const router = express.Router();

router.post('/login', AuthControlloer.login);
router.get('/user', authMiddleware, AuthControlloer.user);
router.post('/register', AuthControlloer.register);
router.get('/logout', AuthControlloer.logout);

export default router;