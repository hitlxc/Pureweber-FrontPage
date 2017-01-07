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
// 
// router.get('/on', function(req, res, next) {

// });

router.get('/getpwd', function(req, res, next) {

	var code = Math.random().toString(36).substr(2);

	if (typeof req.session.uid === 'undefined') {
		res.sendStatus(403);
	}
	else{
		pool.getConnection(function(err, connection) {
			connection.query("INSERT INTO `live_code` (`id`, `uid`, `code`, `time`) VALUES ('', ?, ?, CURRENT_TIMESTAMP)"
				, [req.session.uid, code]
				, function(err, result) {
					console.log(err);
					if (err == null) {
						jsonWrite(res, {
							code: 200,
							rtmpcode: code
						});
					}
					else{
						jsonWrite(res, {
							code: 1,
							err: err
						});
					}
					connection.release();
			});
		});
	}

});

router.post('/auth', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT * FROM `live_code` ORDER BY id DESC LIMIT 1"
			, function(err, result) {
				if (err == null) {
					var param = req.body;
					if (param.key == result[0]['code']) {
						res.sendStatus(200);
					}
					else{
						res.sendStatus(403);
					}
				}
				else{
					res.sendStatus(403);
				}
				connection.release();
		});
	});
});

module.exports = router;