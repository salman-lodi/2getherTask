var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('test');
    res.status(200).json('Welcome to 2gether');
});

module.exports = router;