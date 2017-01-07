var express = require('express');
var router = express.Router();

var blogSql = require('../sql/blogSql');

// var marked = require('marked');
// console.log(marked('I am using __markdown__.'));

/* GET blog page. */

router.all('/upload', function(req, res, next) {
	// res.render('writedown');
	//res.render('md');
	console.log(req);
	res.json({
			code:'1',
			msg: '上传成功'
		});
});



module.exports = router;
