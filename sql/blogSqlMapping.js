// dao/userSqlMapping.js
// CRUD SQL语句
var blog = {
	insert:'INSERT INTO blog(id, title,time,uid,cid,content) VALUES(null , ?, CURRENT_TIMESTAMP , ? , ? , ?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'delete from blog where id=?',
	// view: vblog => 
	// select b.id,u.name,b.title,c.name,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid
	queryById: 'SELECT * FROM vblog where id=?',
	queryAll: 'SELECT * FROM vblog ORDER BY time DESC',
	querys: 'SELECT * FROM vblog ORDER BY time DESC limit ? , ?',
};
 
module.exports = blog;