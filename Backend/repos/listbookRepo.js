var db = require('../fn/mysql-db');

exports.loadAll = () => {
	var sql = 'select * from listbooks';
	return db.load(sql);
}

exports.addBook = (Fullname, PhoneNumber, Address, Note, dateFormat) => {
	var sql = "INSERT INTO `listbooks`(`Fullname`, `PhoneNumber`, `Address`, `Note`, `DateTime`,`Status`) " +
		`VALUES ('${Fullname}', '${PhoneNumber}', '${Address}', '${Note}', '${dateFormat}', 0)`;
		console.log(dateFormat);
		console.log(sql);
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

exports.updateStatusBook = (id, status) => {
	var sql = `UPDATE \`listbooks\` SET \`Status\`='${status}' WHERE id=${id}`;
	return db.load(sql);
}
