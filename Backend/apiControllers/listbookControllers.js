var express = require('express');
var productRepo = require('../repos/listbookRepo.js');

var router = express.Router();

router.get('/', (req, res) => {
	productRepo.loadAll()
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

router.post('/:fullname/:phonenumber/:address/:note', (req, res) => {
	var fullname = req.params.fullname;
	var phonenumber = req.params.phonenumber;
	var address = req.params.address;
	var note = req.params.note;
	productRepo.addBook(fullname, phonenumber, address, note)
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

router.put('/:id/:fullname/:phonenumber/:address/:note', (req, res) => {
	var id = req.params.id;
	var fullname = req.params.fullname;
	var phonenumber = req.params.phonenumber;
	var address = req.params.address;
	var note = req.params.note;
	productRepo.putBook(id, fullname, phonenumber, address, note)
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

router.delete('/:id', (req, res) => {
	var id = req.params.id;
	productRepo.deleteBook(id)
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

module.exports = router;