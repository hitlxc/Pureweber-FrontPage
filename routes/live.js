var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var $conf = require('../conf/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var lib = require('./lib');

// var cheerio = require('cheerio');
var request = require('request');

router.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "null");
    // if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    // else  next();
    console.log(req.ip);
    if (req.ip=="::ffff:127.0.0.1") {
    	next();
    }
    else{
    	res.send(403);
    }
});

// 判断是否在直播
router.get('/state', function(req, res, next) {
	request('http://localhost/stat', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      	console.log(body);
	      	var parseString = require('xml2js').parseString;
			parseString(body, function (err, result) {
				// console.log(parseString(result));
				console.dir(JSON.stringify(result));
			    console.log(result);

			    data = result.rtmp.server[0].application[0].live[0];
			    if (typeof data.stream === 'undefined'){
			    	lib.jsonWrite(res, {
						code: 200,
						state: 0
					});
			    }
			    else{
					if (typeof data.stream[0].active === 'undefined') {
			    		lib.jsonWrite(res, {
							code: 200,
							state: 0
						});
				    }
				    else
				    {
				    	lib.jsonWrite(res, {
							code: 200,
							nclients: parseInt(data.stream[0].nclients),
							state: 1
						});	
				    }
			    }
			  // .stream[0];

			});
	    }
	})
});

router.post('/onplay', function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	res.sendStatus(200);
	console.log("welcome");
});

router.post('/onplaydone', function(req, res, next) {
	res.sendStatus(200);
	console.log("watch over");
});
router.post('/publishdone', function(req, res, next) {
	res.sendStatus(200);
	console.log("live over");
});

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
						lib.jsonWrite(res, {
							code: 200,
							rtmpcode: code
						});
					}
					else{
						lib.jsonWrite(res, {
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