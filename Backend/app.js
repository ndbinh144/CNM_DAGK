var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var listbooksCtrl = require('./apiControllers/listbookControllers');
var usersCtrl = require('./apiControllers/userControllers');

var app = express();

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

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`QLBH API is running on port ${port}`);
})