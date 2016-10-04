var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var database;
if (process.env.ENV == 'Test') {
    database = mongoose.connect('mongodb://mongodb/menuAPI_test');
} else {
    database = mongoose.connect('mongodb://mongodb/menuAPI');
}

var MenuItem = require('./models/menuItem');

var menuRouter = require('./routes/menuRoutes')(MenuItem);

var app = express();

var port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/menu', menuRouter);

app.get('/', function (req, res) {
    res.send('Welcome to Served from Docker!!!!');
})

app.listen(port, function () {
    console.log('Listening on PORT ' + port);
})

module.exports = app;
