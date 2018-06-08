var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var setupController = require('./controllers/setupController');
// call for the api cotroller

var apiController = require('./controllers/apiController');



var port = process.env.PORT ||  3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index')
})
mongoose.connect('mongodb://localhost/todolast');
setupController(app);
apiController(app);

app.listen(port);