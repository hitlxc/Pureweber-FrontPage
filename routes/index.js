var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render('index', { title: 'Pureweber' , logged:log_status});
});

// 具体文章页面
router.get('/article/:id', function(req, res, next) {
	res.send('blog ' + req.params.id);
});

// 总分类页面
router.get('/cat', function(req, res, next) {
	res.render('cat');
});

// 总标签页面
router.get('/tag', function(req, res, next) {
	res.render('tag');
});

// 注册页面
router.get('/signup', function(req, res, next) {
	res.render('signup');
});

// 直播入口
router.get('/live', function(req, res, next) {
	res.render('live');
});

// 重定向
router.get('/*', function(req, res, next) {
	res.redirect('/');
});;


module.exports = router;
