var $mail_conf = require('../conf/mail');
var nodemailer = require("nodemailer");

// 公共函数库
module.exports = {
	// 向前台返回JSON方法的简单封装
	jsonWrite: function (res, ret) {
		if(typeof ret === 'undefined') {
			res.json({
				code:'1',
				msg: '操作失败'
			});
		} else {
			res.json(ret);
		}
	},
	log_status: function(req) {
		if (typeof req.session.uid === 'undefined') {
			log_status = false;
		}
		else{
			log_status = true;
		}
		return log_status;
	},
	send_mail: function(tomail, urlparam){
		var smtpTransport = nodemailer.createTransport("SMTP",$mail_conf.mailsetting);
		var mail_url = $mail_conf.mailsetting.auth.user;
		var mailOptions = {
		  from: "Pureweber Manager <"+mail_url+">", // 发件地址
		  to: tomail, // 收件列表
		  subject: "欢迎成为Pureweber的一员", // 标题
		  html: "<p><b>thanks a for visiting!</b> 世界，你好！</p><p>点击<a href='http://localhost:3000/users/addUser"+urlparam+"' >该链接</a>成为我们正义的伙伴吧</p>" // html 内容
		}
		smtpTransport.sendMail(mailOptions, function(error, response){
			smtpTransport.close(); // 如果没用，关闭连接池
		});
	}
	// mail: function()
};