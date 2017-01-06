var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	if (typeof req.session.uid === 'undefined') {
		log_status = false;
	}
	else{
		log_status = true;
	}

	res.render('index', { title: 'Pureweber' , article:['文章1','文章2','文章3'], logged:log_status});
});

router.get('/cat', function(req, res, next) {
	res.render('cat');
});

router.get('/tag', function(req, res, next) {
	res.render('tag');
});
// 直播入口
router.get('/live', function(req, res, next) {
	res.render('live');
});
// 后台入口
router.get('/user', function(req, res, next) {
	res.render('user');
});
module.exports = router;
