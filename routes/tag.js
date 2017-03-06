var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var lib = require('./lib');


router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT tag.*, count(tid) as times FROM tag left join blogtags on tag.id = blogtags.tid  group by name ORDER by id"
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

router.get('/updateBytid', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("update tag set name=? WHERE id = ?"
			,[param.name,param.tid], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.post('/add', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.body;
		connection.query("INSERT INTO tag(name) VALUES(?)"
			,[param.name], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.post('/delete', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.body;
		var tids = param.tid;
		console.log(tids)
		connection.query("delete from tag where id in ("+tids+")"
			, function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

module.exports = router;