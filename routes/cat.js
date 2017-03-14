var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var lib = require('./lib');

/*id,名字,次数*/
router.get('/getAll', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT category.*, count(cid) as times FROM  category left join blog on category.id = blog.cid  group by name ORDER by id"
			, function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

/*名字*/
router.get('/getNames', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("SELECT name , id FROM category ORDER by id"
			, function(err, result) {
			//var names = result.map(function(data,i){return data.name});
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

/*获取文章cat*/
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

/*通过cat获取文章*/
router.get('/getBycid', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.query || req.params;
		var start = parseInt((param.page-1)*param.num);
		connection.query("select * from vblog where cid= ? ORDER BY time DESC limit ? , ?"
			,[param.cid, start, parseInt(param.num)], function(err, result) {
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
		connection.query("INSERT INTO category(name) VALUES(?)"
			,[param.name], function(err, result) {
			lib.jsonWrite(res, result);
			connection.release();
		});
	});
});

router.post('/delete', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.body;
		/*把原分类下的文章归到未分类下*/
		connection.query("update blog set cid=0 WHERE cid = ?"
			,[param.cid], function(err, result) {
				connection.query("delete from category where id=?"
					,[param.cid], function(err, result) {
					lib.jsonWrite(res, result);
					connection.release();
				});
		});
	});
});

module.exports = router;