var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};


router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT name, count(name) as times FROM tag as t inner join blogtags as bt on t.id = bt.tid  group by name"
			, function(err, result) {
			jsonWrite(res, result);
			connection.release();
		});
	});
});

router.get('/get', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		connection.query("select t.name from tag t inner join blogtags bt on t.id = bt.tid where bt.bid= ?"
			,[param.bid], function(err, result) {
			jsonWrite(res, result);
			connection.release();
		});
	});
});

module.exports = router;