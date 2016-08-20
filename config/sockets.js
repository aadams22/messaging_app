//Socket.io
module.exports = function(app, http, io) {

	var key = new Buffer('Q93HDHKID6EN14OF595032JN63446295');
	var e = require('./encryption.js').encrypt;
	var d = require('./encryption.js').decrypt;
	var dm = null;
	var em = null;

	var onlineUsers = [];
	
	io.on('connection', function(socket){

		socket.on('Current User', function(user){
			onlineUsers.push({ username : user, socketId : socket.id.slice(2) });
			console.log('this is online users: ', onlineUsers[0]);
			updateOnlineUsers(onlineUsers);
		});

		socket.on('Chat Message', function(msg){
			em = e(key, msg);
			io.emit('Chat Message', em);
		});

		socket.on('Decrypt Message', function(msg){
			dm = d(key, msg);
			emitDecrypted(dm); 
		});

		socket.on('disconnect', function(){
			console.log('user disconnected ', socket.id);
			for (var i = 0; i < onlineUsers.length; i++) {
				if (onlineUsers[i].socketId == socket.id) {
					$.grep(onlineUser[i]);
					return onlineUser;
				}
			};
		});

		function emitDecrypted(dm) {
			io.emit('Recieve Decrypted Msg', dm);
		};

		function updateOnlineUsers(onlineUsers) {
			io.emit('Update Online Users', onlineUsers);
		};

	});

};