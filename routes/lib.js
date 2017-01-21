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
	}
};