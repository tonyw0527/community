import { load } from 'dotenv/types';
import express from 'express';
import { authenticateAceessToken } from '../../../middlewares/jwtAuth';
import { loadAllposts, loadMyPost, newPost, deletePost } from './post.controller';

const router = express.Router();

router.get('/', loadAllposts);

router.use(authenticateAceessToken);
router.post('/new', newPost);
router.get('/my', loadMyPost);
router.delete('/delete/:id', deletePost);

export default router;