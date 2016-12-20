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

module.exports = router;
