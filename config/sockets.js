//Socket.io
module.exports = function(app, http, io, crypto) {

function encrypt(key, data) {
  var cipher  = crypto.createCipher('aes256', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}


function decrypt(key, data) {
  var decipher  = crypto.createDecipher('aes256', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

var key = new Buffer('Q93HDHKID6EN14OF595032JN63446295');
var dm = null;
var em = null;
	io.on('connection', function(socket){


		socket.on('Chat Message', function(msg){
			var em = encrypt(key, msg);
			io.emit('Chat Message', em);
		});

		socket.on('Decrypt Message', function(msg){
			dm = decrypt(key, msg);
			console.log(dm);
			emitDecrypted(dm); 
		});

		function emitDecrypted(dm) {
			io.emit('Recieve Decrypted Msg', dm);
		};


	});

};