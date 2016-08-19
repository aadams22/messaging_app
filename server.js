
var express        = require('express'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    port           = process.env.PORT || 8080,
    app            = express();

var http					= require('http').Server(app),
		io						= require('socket.io')(http);

var crypto   		  = require('crypto');

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/messagingapp'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require('./config/encryption.js')(crypto);
require('./config/sockets.js')(app, http, io, crypto);


http.listen(port, function(){
	console.log('hello world');
});