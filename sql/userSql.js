// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
//var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var lib = require("../routes/lib") 

var crypto = require('crypto');
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

module.exports = {
	intro: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			// var param = req.query || req.params;
			// console.log(param);
			// 验证权限auth
			var param = req.body;
			var code = Math.random().toString(36).substr(2)
			// console.log(code);
			connection.query($sql.intro, [param.email, code], function(err, result) {
				console.log(err);
				if(result) {
					result = {
						code: 200,
						msg:'增加成功',
						id: result.insertId,
						acode: code
					};    
				}
				var urlparam = "?code=" + code + "&id=" +result.insertId;
				lib.send_mail(param.email, urlparam);
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.body;

			var content = param.pw;//加密的明文；
			var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
			md5.update(content);
			var d = md5.digest('hex');  //加密后的值d
			//console.log(param)
			//console.log(d)

			var fs = require('fs');
			//var suffix = param.avatar.splite('.')[param.avatar.splite('.').length-1]; //获取后缀
			//var newAvatarName = param.name+suffix;
			var oldAvatarRoute = 'public/upload/'+param.avatar;
			var newAvatarRoute = 'public/img/user/avatar/'+param.avatar;
			
			fs.rename(oldAvatarRoute,newAvatarRoute,function(err){
				if(err){
					//console.log(err)
				}
				connection.query($sql.insert, [param.name, param.email, d, param.avatar, param.realname, param.major, param.intro, param.studentId, param.code], function(err, result) {
					//console.log(err);
					//console.log($sql.insert);
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
			})

			
		});
	},
	logout: function (req, res, next) {
		// console.log(req.session.username);
		req.session.destroy(); 
	    jsonWrite(res, {
					code: 200,
					msg:'已退出'
				});
	},
	login: function (req, res, next) {
		// console.log(req.session.uid);
		//if (typeof req.session.uid === 'undefined') {
			// var param = req.query || req.params;
			var param = req.body;
			var name = param.name;

			var content = param.pwd;//加密的明文；
			var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
			md5.update(content);
			var rpwd = md5.digest('hex');  //加密后的值d
			// console.log(rpwd);
			pool.getConnection(function(err, connection) {
				connection.query($sql.login, [name, rpwd], function(err, result) {
					console.log(err);
					if (result.length == 0) {
						jsonWrite(res, {
							code:'1',
							msg: '账号或密码错误'
						});
					}
					else {
						req.session.uid=result[0].id;
						jsonWrite(res, result);
					}
					connection.release();
	 
				});
			});
		//}
		/*
		else{
		    jsonWrite(res, {
						code: 200,
						msg:'已登陆',
						id: req.session.uid
					});
		}*/
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
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
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
};