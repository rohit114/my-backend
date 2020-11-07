var express = require('express');
var router = express.Router();

const User = require('./../api/controllers/UserController');


router.get('/user', function(req, res, next) {
   User.getUsers(req, res);
});


module.exports = router;
