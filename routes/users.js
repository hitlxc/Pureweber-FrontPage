var express = require('express');
var router = express.Router();
var userSql = require('../sql/userSql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('updateUser');
});

//http://localhost:3000/users/addUser?name=xyz&age=18
router.get('/addUser', function(req, res, next) {
	userSql.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userSql.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	userSql.queryById(req, res, next);
});
 
router.get('/deleteUser', function(req, res, next) {
	userSql.delete(req, res, next);
});
 
router.post('/updateUser', function(req, res, next) {
	userSql.update(req, res, next);
});

module.exports = router;
