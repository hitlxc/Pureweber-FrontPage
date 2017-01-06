// dao/userSqlMapping.js
// CRUD SQL语句
var blog = {
	insert:'INSERT INTO blog(id, title,time,uid,cid,content) VALUES(null , ?, CURRENT_TIMESTAMP , ? , ? , ?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'delete from blog where id=?',
	queryById: 'select b.id,u.name,b.title,c.name,b.cid,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid where b.id=?',
	queryAll: 'select b.id,u.name,b.title,c.name,b.cid,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid ORDER BY b.time DESC',
	// select b.id,u.name,b.title,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid limit 1 , 3
	// select b.id,u.name,b.title,c.name,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid limit 1 , 3
	querys: 'select b.id,u.name,b.title,c.name,b.cid,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid ORDER BY b.time DESC limit ? , ?',
};
 
module.exports = blog;