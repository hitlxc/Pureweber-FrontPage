var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var lib = require('./lib');


router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT name, count(name) as times FROM tag as t inner join blogtags as bt on t.id = bt.tid  group by name"
			, function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/get', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("select t.name from tag t inner join blogtags bt on t.id = bt.tid where bt.bid= ?"
			,[param.bid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/getBytid', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("select * from tblog where tid= ?"
			,[param.tid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

module.exports = router;