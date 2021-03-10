import express from 'express';

// routes
import auth from './auth';
import user from './user';

// middlewares
import { authenticateAceessToken } from '../../middlewares/jwtAuth';

const router = express.Router();

router.use('/auth', auth);

router.use('/user', authenticateAceessToken); // authMiddleware가 있어서 /test 접근시 토근검증 후 통과
router.use('/user', user);

export default router;