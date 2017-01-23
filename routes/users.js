var express = require('express');
var router = express.Router();
var userSql = require('../sql/userSql');
var lib = require('./lib');

router.all('/api/login', function(req, res, next) {
	userSql.login(req, res, next);
});

router.all('/status', function(req, res, next) {
	res.send(lib.log_status(req));
});

// 检查登陆状态
router.use(function check(req, res, next) {
	if(lib.log_status(req)){
		next();
	}
	else{
		res.send(400);
	}
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('updateUser');
});

router.get('/invite', function(req, res, next) {
	res.render('invite');
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
	userSql.intro(req, res, next);
});

module.exports = router;
