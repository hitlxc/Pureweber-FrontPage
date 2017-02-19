// dao/userSqlMapping.js
// CRUD SQL语句
var blog = {
	insert:'INSERT INTO blog(id, title,time,uid,cid,content,cover) VALUES(null , ?, CURRENT_TIMESTAMP , ? , ? , ?, ?)',
	update:'update blog set title=?,cid=?,content=?,cover=? where id=?',
	delete: 'delete from blog where id=?',
	// view: vblog => 
	// select b.id,u.name,b.title,c.name,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid
	queryById: 'SELECT * FROM vblog where id=?',
	queryAll: 'SELECT * FROM vblog ORDER BY time DESC',
	querys: 'SELECT * FROM vblog ORDER BY time DESC limit ? , ?',
	queryByY: 'SELECT * FROM vblog  WHERE `y` = ? ',
	queryByYM: 'SELECT * FROM vblog WHERE `ym` = ? ',
};

// CREATE VIEW `vblog` AS  select `b`.`id` AS `id`,`u`.`name` AS `author`,`b`.`title` AS `title`,`c`.`name` AS `category`,`b`.`cid` AS `cid`,`b`.`time` AS `time`,date_format(`b`.`time`,'%Y%m') AS `ym`,date_format(`b`.`time`,'%Y') AS `y`,`b`.`content` AS `content` from ((`blog` `b` join `user` `u` on((`u`.`id` = `b`.`uid`))) join `category` `c` on((`c`.`id` = `b`.`cid`)));

module.exports = blog;