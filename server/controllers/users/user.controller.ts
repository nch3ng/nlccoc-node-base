import * as express from 'express';

let router = express.Router();

router.get('/:userId', function (req, res) {
  res.send('get user: '+ req.params.userId);
})

module.exports = router 
