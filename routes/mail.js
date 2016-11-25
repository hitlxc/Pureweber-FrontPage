var express = require('express');
var nodemailer = require("nodemailer");
var router = express.Router();

var $mail_conf = require('../conf/mail');

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

router.get('/signup', function(req, res, next) {
	var smtpTransport = nodemailer.createTransport("SMTP",$mail_conf.mailsetting);
	var param = req.query || req.params;
	var mail_url = $mail_conf.mailsetting.auth.user;
	var urlparam = "?code=" + param.code + "&id=" +param.id;
	// ?code=param.acode&id=param.id
	var mailOptions = {
	  from: "Pureweber Manager <"+mail_url+">", // 发件地址
	  to: param.tomail, // 收件列表
	  subject: "欢迎成为Pureweber的一员", // 标题
	  html: "<p><b>thanks a for visiting!</b> 世界，你好！</p><p>点击<a href='http://localhost:3000/user/signup"+urlparam+"' >该链接</a>成为我们正义的伙伴吧</p>" // html 内容
	}
	smtpTransport.sendMail(mailOptions, function(error, response){
	  if(error){
	  	result = {
			code: "1",
			msg: error.data,
		};
	  }else{
	    // console.log("Message sent: " + response.message);
		result = {
			code: 200,
			msg: response.message,
		};
		
	  }
	  smtpTransport.close(); // 如果没用，关闭连接池
	  jsonWrite(res, result);
	});
});


module.exports = router;