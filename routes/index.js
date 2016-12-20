var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	res.render('index', { title: 'Pureweber' , article:['文章1','文章2','文章3'], logged:false});
});

module.exports = router;
