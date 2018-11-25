var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    socketIO = require('socket.io');


var listbooksCtrl = require('./apiControllers/listbookControllers');
var usersCtrl = require('./apiControllers/userControllers');
var drivers = require('./fn/json-db');
var listBooksRepo = require('./repos/listbookRepo');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});
app.post("/receiver" , urlencodedParser , function(req, res){
    var f = req.body.name;
    var p = req.body.phone;
    var l = req.body.pickuplocation;
    var n = req.body.note;
    res.send("full name :" + f + " phone : " + p);
});
app.use('/api/listbooks/', listbooksCtrl);
app.use('/api/user/', usersCtrl);

io.on('connection', socket => {
    socket.on('changed', () => {
        console.log('change list book');
        io.emit('changed', {});
    })
    socket.on('locate', (data) => {
        // Gọi xe nhận request
        io.emit('changed', {});
        drivers.saveDataRequest(data);
        var listDriverReady = drivers.getDriverReady(data.position);
        var len = listDriverReady.length;
        if(len > 0) {
            // Gọi xe đầu tiên
            var index = drivers.getIndex();
            io.emit('receive', {id: listDriverReady[index].id, posCustomer: data.position});
        } else {
            listBooksRepo.updateStatusBook(data.id, 4);
            drivers.resetIndex();
            io.emit('changed', {});
        }
    })
    socket.on('driverFeedBack', (dataFeedBack) => {
        var dataReq = drivers.getDataREquest();
        console.log(dataFeedBack.status);
        if (dataFeedBack.status) {
            if (dataReq != null) {
                listBooksRepo.updateStatusBook(dataReq.id, 2);
                drivers.resetIndex();
                io.emit('changed', {});
            }
        } else {
            drivers.increaseIndex();
            var listDriverReady = drivers.getDriverReady(dataReq.position);
            var len = listDriverReady.length;
            var indexDr = drivers.getIndex();
            if(indexDr < len) {
                // Gọi xe kế tiếp
                io.emit('receive', {id: listDriverReady[indexDr].id, posCustomer: dataReq.position});
            } else {
                if (dataReq != null) {
                    listBooksRepo.updateStatusBook(dataReq.id, 4);
                    drivers.resetIndex();
                    io.emit('changed', {});
                }
            }
        }
    })
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    drivers.resetListDriver();
    console.log(`BookCar API is running on port ${port}`);
    console.log(`Socket is running on port ${port}`);
})