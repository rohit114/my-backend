var express = require('express');
var router = express.Router();
const User = require('./../services/UserService');

router.get('/user', function(req, res, next) {
   User.getUsers(req, res);
});


module.exports = router;
