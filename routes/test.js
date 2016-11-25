var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var $conf = require('../conf/db');
 


router.get('/', function(req, res, next) {
	var connection = mysql.createConnection($conf.mysql);

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The solution is: ', rows[0].solution);	
	});
	connection.end();
	// res.send(rows[0].solution);

});


module.exports = router;
