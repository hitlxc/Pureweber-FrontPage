var express = require('express');
var router = express.Router();

var blogSql = require('../sql/blogSql');

// var marked = require('marked');
// console.log(marked('I am using __markdown__.'));

/* GET blog page. */

router.get('/', function(req, res, next) {
	// res.render('writedown');
	res.render('md');
});

router.post('/save', function(req, res, next) {
	// 加密?判断登录?
	blogSql.add(req, res, next);
});

// router.get('/info', function(req, res, next) {
// 	blogSql.queryById(req, res, next);
// });

router.get('/index', function(req, res, next) {
	// blogSql.querys(req, res, next);
	res.render("card");
});


router.get('/gets', function(req, res, next) {
	blogSql.querys(req, res, next);
});

router.get('/show', function(req, res, next) {
	blogSql.queryById(req, res, next);
	//console.log(res);
});

router.get('/getByTime', function(req, res, next) {
	blogSql.queryByTime(req, res, next);
});

router.get('/edit', function(req, res, next) {
	//blogSql.queryById(req, res, next);
	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render('edit',{logged:log_status});
	
});

module.exports = router;
