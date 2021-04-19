var express = require('express');
var router = express.Router();

const User = require('./../api/controllers/UserController');
const Niyo = require('./../api/controllers/NiyoController');

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

router.post('/dump-data', function(req, res, next) {
   Niyo.dumpDummyData(req, res);
});
//getUserTrxnHistory
router.get('/get-user-trxn-by-month', function(req, res, next) {
   Niyo.getUserTrxnHistory(req, res);
});

module.exports = router;
