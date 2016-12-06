var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('test');
});

router.get('/11', function(req, res, next) {
  res.send('test11');
});

module.exports = router;
