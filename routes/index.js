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

router.get('/get-users', function(req, res, next) {
   User.getAllDataFromMap(req, res);
});

router.get('/get-users-by-id', function(req, res, next) {
   User.getDataFromMapById(req, res);
});

router.post('/create-user-v2', function(req, res, next) {
   User.createDataInMap(req, res);
});

router.put('/update-user-v2', function(req, res, next) {
   User.updateDataFromMapById(req, res);
});


module.exports = router;
