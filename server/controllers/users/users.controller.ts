import * as express from 'express';

let users_router = express.Router();
let user_router = express.Router();
// define the home page route
users_router.get('/', function (req, res) {
  res.send('users list')
})




user_router.get('/:userId', function (req, res) {
  res.send('get user: '+ req.params.userId);
})
module.exports = {
  users: users_router,
  user: user_router
}
