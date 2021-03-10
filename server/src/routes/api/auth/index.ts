import express from 'express';
import { register, login, check, logout, refresh } from './auth.controller';
import localAuth from '../../../middlewares/localAuth';
import { authenticateAceessToken, authenticateRefreshToken } from '../../../middlewares/jwtAuth';

const router = express.Router();

router.post('/register', register);
router.post('/login', localAuth, login);
router.get('/check', authenticateAceessToken, check);
router.get('/logout', logout);
router.get('/refresh', authenticateRefreshToken, refresh);

export default router;