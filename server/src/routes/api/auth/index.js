const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/login', controller.login);
router.get('/user', authMiddleware, (req, res) => {
  if(req.user) {
    res.status(200).json({
      me: req.user
    });
  }
});
router.post('/register', controller.register);
router.get('/logout', controller.logout);

module.exports = router;