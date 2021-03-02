const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout);
router.get('/check', authMiddleware);

module.exports = router;