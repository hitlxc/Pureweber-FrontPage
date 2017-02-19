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

/*添加文章*/
router.post('/save', function(req, res, next) {
	// 加密?判断登录?
	blogSql.add(req, res, next);
});

/*更新文章*/
router.post('/update', function(req, res, next) {
	// 加密?判断登录?
	blogSql.update(req, res, next);
});

/*删除文章*/
router.post('/delete', function(req, res, next) {
	blogSql.delete(req, res, next);
});
// router.get('/info', function(req, res, next) {
// 	blogSql.queryById(req, res, next);
// });

router.get('/index', function(req, res, next) {
	// blogSql.querys(req, res, next);
	res.render("card");
});

/*博客管理*/
router.get('/admin', function(req, res, next) {
	// blogSql.querys(req, res, next);
	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render("blog-admin" ,{logged:log_status});
});

/*分类管理*/
router.get('/admin/cat', function(req, res, next) {
	// blogSql.querys(req, res, next);
	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render("blog-admin-cat" ,{logged:log_status});
});

/*tag管理*/
router.get('/admin/tag', function(req, res, next) {
	// blogSql.querys(req, res, next);
	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render("blog-admin" ,{logged:log_status});
});

/*获取文章*/
router.get('/gets', function(req, res, next) {
	blogSql.querys(req, res, next);
});

/*显示一篇文章*/
router.get('/article', function(req, res, next) {
	//blogSql.queryById(req, res, next);
	res.render("article");
	//console.log(res);
});

/*获取一篇文章详细内容*/
router.get('/show', function(req, res, next) {
	blogSql.queryById(req, res, next);
	//res.render("article");
	//console.log(res);
});

/*通过时间过滤获取文章*/
router.get('/getByTime', function(req, res, next) {
	blogSql.queryByTime(req, res, next);
});

/*编辑文章*/
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
