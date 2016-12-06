var express = require('express');
var router = express.Router();
var userSql = require('../sql/userSql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('updateUser');
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/invite', function(req, res, next) {
	res.render('invite');
});

router.all('/api/login', function(req, res, next) {
	// 验证
	userSql.login(req, res, next);
});

router.get('/logout', function(req, res, next) {
	// 验证
	userSql.logout(req, res, next);
});
router.get('/addUser', function(req, res, next) {
	// http://localhost:3000/users/addUser?name=qq&pwd=qq&code=xsgst2kzpxgh9f6r&id=3
	userSql.add(req, res, next);
});
router.all('/intro', function(req, res, next) {
	// 验证
	userSql.intro(req, res, next);
});

module.exports = router;
