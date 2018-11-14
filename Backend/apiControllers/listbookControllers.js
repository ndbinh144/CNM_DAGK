var express = require('express');
var productRepo = require('../repos/listbookRepo.js');
var axios = require('axios');
var moment = require('moment');
var router = express.Router();

router.get('/:address', (req, res) => {
	var address = req.params.address;
	var uri = encodeURI(address);
	console.log('current time: ', moment().format());
	const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=t38YeeN2CdvTOlESpiKl&app_code=RplvOnsG0MVj2Q4Haui4Ng&searchtext=${uri}&jsonattributes=1`;
	// const url = `https://geocoder.cit.api.here.com/6.2/geocode.json?xnlp=CL_JSMv3.0.17.0
	// &app_id=t38YeeN2CdvTOlESpiKl&app_code=RplvOnsG0MVj2Q4Haui4Ng
	// &searchText=${uri}
	// &jsonattributes=1&jsoncallback=H.service.jsonp.handleResponse(5)`;
	axios.get(url).then(response => {
		console.error('bug');
		console.log(response.data);

		res.json(response.data);
	})
})

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