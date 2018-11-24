var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    socketIO = require('socket.io');


var listbooksCtrl = require('./apiControllers/listbookControllers');
var usersCtrl = require('./apiControllers/userControllers');
var drivers = require('./fn/json-db');

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
    console.log('A user connected.');
    socket.on('changed', () => {
        console.log('change list book');
        io.emit('changed', {});
    })
    socket.on('locate', (id) => {
        // Gọi xe nhận request
        io.emit('changed', {});
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        var listDriverReady = drivers.getDriverReady();
        io.emit('receive', {id: listDriverReady[0].id});
    })
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`BookCar API is running on port ${port}`);
})