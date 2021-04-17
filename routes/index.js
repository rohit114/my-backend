var express = require('express');
var router = express.Router();

const User = require('./../api/controllers/UserController');

/* Define your routes here */

router.get('/user', function(req, res, next) {
   User.getUser(req, res);
});

router.post('/create-user', function(req, res, next) {
   User.createUser(req, res);
});

router.post('/bulk-insert', function(req, res, next) {
   User.bulkInsertDemo(req, res);
});

router.post('/batch-process', function(req, res, next) {
   User.processInBatch(req, res);
});


module.exports = router;
