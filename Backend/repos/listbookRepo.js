var db = require('../fn/mysql-db');

exports.loadAll = () => {
	var sql = 'select * from listbooks';
	return db.load(sql);
}

exports.addBook = (Fullname, PhoneNumber, Address, Note) => {
	var sql = "INSERT INTO `listbooks`(`Fullname`, `PhoneNumber`, `Address`, `Note`) " +
		`VALUES ('${Fullname}', '${PhoneNumber}', '${Address}', '${Note}')`;
	return db.load(sql);
}

exports.putBook = (id, fullname, phonenumber, address, note) => {
	var sql = `UPDATE \`listbooks\` SET \`Fullname\`='${fullname}',\`PhoneNumber\`='${phonenumber}',\`Address\`='${address}',\`Note\`='${note}' WHERE id=${id}`;
	return db.load(sql);
}

exports.deleteBook = (id) => {
	var sql = `DELETE FROM \`listbooks\` WHERE id=${id}`;
	return db.load(sql);
}

