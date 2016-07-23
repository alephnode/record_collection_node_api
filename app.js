var express = require('express'),
    mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
    path = require('path');

//Connect to MongoDB Collection
var db = mongoose.connect('mongodb://localhost/recordApp');
var Record = require('./models/recordModel');

var app = express();

var port = process.env.PORT || 3000;

//After all variables are defined, good to include bp info here
//We want the body to be url encoded and in json!
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Declare reference to record route * also add parens since function
//also pass in the record model so the routes know what you're talking about
recordRouter = require('./Routes/recordRoutes.js')(Record);

app.use('/api/records/', recordRouter);
//serve static files!
app.use(express.static('public'));

app.get('/', function(req, res){
	res.send('Welcome to my API!');
});

app.listen(port, function(){
	console.log('Listening on port ' + port);
});

//
// var express = require('express'),
//     app = express();
//
// var port = process.env.PORT || 5555;
//
// app.get('/', function(req, res){
//
// 	res.send('Hello, party people!');
//
// });
//
// app.listen(port);
