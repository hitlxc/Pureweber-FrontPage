// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	// insert:'INSERT INTO user(id, name, email, pwd, time) VALUES(null, ?, ?, ?, CURRENT_TIMESTAMP)',
	intro: 'INSERT INTO user(id, email, time, code) VALUES(null, ?, CURRENT_TIMESTAMP, ?)',
	update:'update user set name=?, pwd=?, state = 1, auth = 1 WHERE state = 0 and code = ? and id = ?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};
 
module.exports = user;