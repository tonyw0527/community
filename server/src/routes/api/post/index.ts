import { load } from 'dotenv/types';
import express from 'express';
import { authenticateAceessToken } from '../../../middlewares/jwtAuth';
import { loadAllposts, loadOnePost, loadMyPosts, newPost, deletePost } from './post.controller';

const router = express.Router();

router.get('/', loadAllposts);
router.get('/:id', loadOnePost);

router.use(authenticateAceessToken);
router.get('/manage/my', loadMyPosts);
router.post('/new', newPost);
// router.put('/:id', );
router.delete('/:id', deletePost);

export default router;