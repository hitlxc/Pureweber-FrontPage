// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
//var $util = require('../util/util');
var $sql = require('./blogSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
 
var marked = require('marked');

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

var removeHTMLTag = function(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			// var param = req.query || req.params;
 			var param = req.body;
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			
			//console.log(param);
			connection.query($sql.insert, [param.title, req.session.uid, param.cid, param.content, param.cover], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.body.id;
			console.log(id)
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		var param = req.body;
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.title, param.cid, param.content, param.cover, param.id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'更新成功'
					};    
				}

 				
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
				// res.send(marked(result[0]['content']));
			});
		});
	},
	querys: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			if (param.num == null) {
				connection.query($sql.queryAll, function(err, result) {
					jsonWrite(res, result);
					connection.release();
				});
			}
			else{
				var start = parseInt((param.page-1)*param.num);
				connection.query($sql.querys, [start, parseInt(param.num)], function(err, result) {
					jsonWrite(res, result);
					connection.release();
				});				
			}

		});
	},
	querysCurt: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			if (param.num == null) {
				connection.query($sql.queryAll, function(err, result) {
					jsonWrite(res, result);
					connection.release();
				});
			}
			else{
				var start = parseInt((param.page-1)*param.num);
				connection.query($sql.querysCurt, [start, parseInt(param.num)], function(err, result) {
					for(var i=0 ; i<result.length ; i++){
 						result[i].content = removeHTMLTag(marked(result[i].content)).length>100?removeHTMLTag(marked(result[i].content)).slice(0,100)+' ...':removeHTMLTag(marked(result[i].content));
 					}
					jsonWrite(res, result);
					connection.release();
				});				
			}

		});
	},
	queryByTime: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			if (param.y == null) {
				connection.query($sql.queryByYM, [param.ym], function(err, result) {
					jsonWrite(res, result);
					connection.release();
				});
			}
			else{
				connection.query($sql.queryByY, [param.y], function(err, result) {
					jsonWrite(res, result);
					connection.release();
				});
			}
		});
	}
};