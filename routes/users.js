var express = require('express');
var router = express.Router();
var userSql = require('../sql/userSql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('updateUser');
});

//http://localhost:3000/users/addUser?name=xyz&age=18
router.get('/addUser', function(req, res, next) {
	// 验证
	userSql.add(req, res, next);
});
router.get('/intro', function(req, res, next) {
	// 验证
	userSql.intro(req, res, next);
});

module.exports = router;
