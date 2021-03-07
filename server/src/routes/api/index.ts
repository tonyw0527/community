import express from 'express';

// routes
import auth from './auth';
const test = require('./test');

// middlewares
import jwtAuthMiddleware from '../../middlewares/jwt';

const router = express.Router();

router.use('/auth', auth);

router.use('/test', jwtAuthMiddleware); // authMiddleware가 있어서 /test 접근시 토근검증 후 통과
router.use('/test', test);

module.exports = router;