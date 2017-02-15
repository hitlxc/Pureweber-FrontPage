var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var lib = require('./lib');

router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT cid, name, count(name) as times FROM  category c inner join blog as b on c.id = b.cid  group by cid"
			, function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/get', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("select c.name from category c inner join blog b on c.id = b.cid where b.id= ?"
			,[param.bid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/getBycid', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("select * from vblog where cid= ?"
			,[param.cid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/updateBycid', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("update category set name=? WHERE id = ?"
			,[param.name,param.cid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.post('/add', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.body;
		console.log(param.name)
		connection.query("INSERT INTO category(name) VALUES(?)"
			,[param.name], function(err, result) {
				console.log(err);
				//console.log(result);
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});
//"DELETE FROM `category` WHERE `category`.`id` = 2"

module.exports = router;