var express = require('express');
var router = express.Router();
var userSql = require('../sql/userSql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('updateUser');
});

router.get('/login', function(req, res, next) {
	// 验证
	userSql.login(req, res, next);
});
router.get('/logout', function(req, res, next) {
	// 验证
	userSql.logout(req, res, next);
});
router.get('/addUser', function(req, res, next) {
	// 验证
	userSql.add(req, res, next);
});
router.get('/intro', function(req, res, next) {
	// 验证
	userSql.intro(req, res, next);
});

module.exports = router;
