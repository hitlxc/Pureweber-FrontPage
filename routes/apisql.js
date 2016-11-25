var sql = {
	tag_getAll:'SELECT name, count(name) as times FROM tag as t inner join blogtags as bt on t.id = bt.tid  group by name',
	tag_get:"select t.name from tag t inner join blogtags bt on t.id = bt.tid where bt.bid= ?",
};
 
module.exports = sql;