//Socket.io
module.exports = function(app, http, io, crypto) {

var key = new Buffer('Q93HDHKID6EN14OF595032JN63446295');
var e = require('./encryption.js').encrypt;
var d = require('./encryption.js').decrypt;
var dm = null;
var em = null;

	
	io.on('connection', function(socket){


		socket.on('Chat Message', function(msg){
			em = e(key, msg);
			io.emit('Chat Message', em);
		});

		socket.on('Decrypt Message', function(msg){
			dm = d(key, msg);
			emitDecrypted(dm); 
		});

		function emitDecrypted(dm) {
			io.emit('Recieve Decrypted Msg', dm);
		};


	});

};