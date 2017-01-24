var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var lib = require('./lib');


router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT name, count(name) as times FROM  user u inner join blog as b on u.id = b.uid  group by name"
			, function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});
router.get('/getByname', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("SELECT * FROM `vblog` WHERE `author` LIKE ?"
			,["%"+param.name+"%"], function(err, result) {
				lib.jsonWrite(res, result);
				connection.release();
		});
	});
});
module.exports = router;