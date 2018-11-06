var db = require('../fn/mysql-db');

exports.loadAll = () => {
	var sql = 'select * from listbooks';
	return db.load(sql);
}