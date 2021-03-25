import express from 'express';
import { authenticateAceessToken } from '../../../middlewares/jwtAuth';
import { loadAllposts, newPost } from './post.controller';

const router = express.Router();

router.get('/', loadAllposts);

router.use(authenticateAceessToken);
router.post('/new', newPost);

export default router;