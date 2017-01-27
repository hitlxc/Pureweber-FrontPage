var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var uuid = require('node-uuid');
var fs = require('fs');

var lib = require('./lib');

upload = function(req, res, dirname){
	//创建上传表单
	var form = new formidable.IncomingForm();
	//设置编辑
	form.encoding = 'utf-8';
	//设置上传目录
	form.uploadDir = 'public/'+dirname+"/";
	//检查目录是否存在
	if (fs.existsSync(form.uploadDir) == false) {
		fs.mkdirSync(form.uploadDir);
	}
	
	form.keepExtensions = true;
	//文件大小
	form.maxFieldsSize = 10 * 1024 * 1024;
	form.parse(req, function (err, fields, files) {
		if(err) {
			res.send(err);
			return;
		}
		var extName = /\.[^\.]+/.exec(files.file.name);
		var ext = Array.isArray(extName)
			? extName[0]
			: '';
		// ext 后缀
		// console.log(ext);

		if (ext == ".gif" ||ext == ".jpg" ||ext == ".png") {
			var avatarName = uuid() + ext;
			//移动的文件目录
			var newPath = form.uploadDir + avatarName;
			fs.renameSync(files.file.path, newPath);
			result = {
				code: 200,
				msg: avatarName,
			};
		}
		else{
			var newPath = form.uploadDir + files.file.name
			fs.renameSync(files.file.path, newPath);
			result = {
				code: 200,
				msg: files.file.name,
			};
		}
		lib.jsonWrite(res, result);
	});
}

router.get('/', function(req, res, next) {
	// res.render('writedown');
	res.render('file');
});

router.post('/avatar', function(req, res, next) {
	upload(req, res,"avatar");
});

router.post('/cover', function(req, res, next) {
	upload(req, res,"cover");
});
router.post('/upload', function(req, res, next) {
	upload(req, res,"upload");
});



module.exports = router;
