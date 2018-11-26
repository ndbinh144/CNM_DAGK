var express = require('express');
var productRepo = require('../repos/listbookRepo.js');
var axios = require('axios');
var moment = require('moment');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonData = require('../fn/json-db')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/:address', (req, res) => {
	var address = req.params.address;
	var uri = encodeURI(address);
	console.log('current time: ', moment().format());
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${uri}&key=AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q`;
	// const url = `https://geocoder.cit.api.here.com/6.2/geocode.json?xnlp=CL_JSMv3.0.17.0
	// &app_id=t38YeeN2CdvTOlESpiKl&app_code=RplvOnsG0MVj2Q4Haui4Ng
	// &searchText=${uri}
	// &jsonattributes=1&jsoncallback=H.service.jsonp.handleResponse(5)`;
	axios.get(url).then(response => {
		if (response.data.results.length > 0) {
			res.json(response.data.results[0].geometry.location)
		} else {
			res.json({
				lat: null,
				lng: null
			})
		}
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

// Cập nhật tọa độ drivers
router.post('/drivers/submit_locate', (req, res) => {
	var id = req.body.id;
	var pos = req.body.nextPos;
	var result = jsonData.updateLocateDriver(id, pos);
	res.json({status: result});
})

// Sua thong tin Status list book
router.post('/:ID', (req, res) => {
	var ID =  req. params.ID;
	var Status = req.body.status;
	productRepo.updateStatusBook(ID, Status)
		.then( () => {
			res.json({status: '1'})
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

// Đăng ký driver
router.post('/driver/submit', (req, res) => {
	var id = req.body.id;
	var currAddress = req.body.currAddress
	var status = req.body.status
	if (jsonData.checkExitDriver(id)) {
		jsonData.updateDriver(id, currAddress, status);
	} else {
		new_driver = {
			id: id,
			currAddress: currAddress,
			status: status
		}
		jsonData.addNewDriver(new_driver);
	}
	res.json({
		status: 1
	})
})

// fullname, phonenumber, address, note
router.post('/', urlencodedParser, (req, res) => {
	productRepo.addBook(req.body.FullName, req.body.PhoneNumber, req.body.Address, req.body.Note)
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
