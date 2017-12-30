import User from "../../models/user";
import * as jwt from "jsonwebtoken";
import Config from "../../config";

import logger = require("../../helpers/logger");

module.exports = function(req, res) {
  var reqUser = req.body;
  logger.debug("login user");

  User.findOne({'email' : reqUser.email}, (err, user, done) => {
    let config = Config.config;

    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'User does not exists'
      };
      res.send(content);
      return;
    }

    if( !user.validPassword(reqUser.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      res.send(content);
      return;
    }

    let token = jwt.sign({
      userID: user._id,
      email: user.email,
      name: user.name
    }, config.secret, {
      expiresIn : 60*60*config.expiry
    });
    logger.debug(token);
    let content = {
      user: user,
      success: true,
      message: 'You logged in',
      token: token
    };
    res.send(content);
  })

}