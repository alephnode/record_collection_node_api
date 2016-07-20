var express = require('express'),
    app = express();

var port = process.env.PORT || 5555;

app.get('/', function(req, res){

	res.send('Hello, party people!');

});

app.listen(port);
