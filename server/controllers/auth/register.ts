import User from "../../models/user";

module.exports = function(req, res) {
  console.log("Registering user: " + req.body.email);
  var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
  
    console.log(req.body.firstName + ' ' + req.body.lastName);
    console.log(req.body.email);
    console.log(req.body.password);
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      //console.log(token);
      res.status(200);
      res.json({
        "user": user,
        "success": true,
        "message": 'You created a new user',
        "token" : token
      });
    });
}