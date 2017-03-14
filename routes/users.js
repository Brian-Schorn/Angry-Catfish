var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/currentUser', function(req, res){
  var adminstatus = false;
  console.log("USER INCOMING:",req.user);
  var currentUser = req.user;
  if(currentUser.admin == null || currentUser.admin == false){
    adminstatus = false;
  }else{
    adminstatus = true;
  }
  var toSend = {user: currentUser,admin: adminstatus}
  res.send(toSend);
});

module.exports = router;
