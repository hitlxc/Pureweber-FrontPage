var express = require('express');
var router = express.Router();

var blogSql = require('../sql/blogSql');

// var marked = require('marked');
// console.log(marked('I am using __markdown__.'));

/* GET blog page. */

/*router.all('/upload', function(req, res, next) {
	// res.render('writedown');
	//res.render('md');
	console.log(req);
	res.json({
			code:'1',
			msg: '上传成功'
		});
});*/
router.get('/', function(req, res, next) {
	// res.render('writedown');
	res.render('file');
});






var formidable = require('formidable');
var uuid = require('node-uuid');
var fs = require('fs');

router.post('/upload', function(req, res, next) {
	//创建上传表单
	var form = new formidable.IncomingForm();
	//设置编辑
	form.encoding = 'utf-8';
	//设置上传目录
	form.uploadDir = 'public/upload/';
	form.keepExtensions = true;
	//文件大小
	form.maxFieldsSize = 10 * 1024 * 1024;
	form.parse(req, function (err, fields, files) {
		if(err) {
			res.send(err);
			return;
		}
		console.log(fields);
		var extName = /\.[^\.]+/.exec(files.file.name);
		var ext = Array.isArray(extName)
			? extName[0]
			: '';
		//重命名，以防文件重复
		var avatarName = uuid() + ext;
		//移动的文件目录
		var newPath = form.uploadDir + avatarName;
		fs.renameSync(files.file.path, newPath);
		console.log(avatarName);
		res.send('success');
	});
});



module.exports = router;
