import * as express from 'express';
import logger = require("./helpers/logger");
let router = express.Router();
let auth = require("./controllers/auth/middleware/auth");

let registerCtrl = require("./controllers/auth/register");
let loginCtrl = require("./controllers/auth/login");
let usersCtrl = require("./controllers/users/users.controller");

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);
router.get('/check-state', auth.verifyToken, (req, res) => {
  logger.debug("check-state");
  let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);
});

router.use('/user', auth.verifyToken, usersCtrl.user);
router.use('/users', auth.verifyToken, usersCtrl.users);

module.exports = router;