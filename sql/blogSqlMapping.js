// dao/userSqlMapping.js
// CRUD SQL语句
var blog = {
	insert:'INSERT INTO blog(id, title,time,uid,cid,content) VALUES(null , ?, CURRENT_TIMESTAMP , ? , ? , ?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'delete from blog where id=?',
	queryById: 'select * from blog where id=?',
	queryAll: 'select * from blog'
};
 
module.exports = blog;