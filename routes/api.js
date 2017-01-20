var express = require('express');
var router = express.Router();

var users = require('./users');
var test = require('./test');
var blog = require('./blog');
var tag = require('./tag');
var cat = require('./cat');
var aut = require('./author');
var mail = require('./mail');
var live = require('./live');

router.use('/users', users);
router.use('/blog', blog);
router.use('/test', test);
router.use('/tag',tag);
router.use('/cat',cat);
router.use('/mail',mail);
router.use('/aut',aut);
router.use('/live',live);

module.exports = router;


