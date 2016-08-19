module.exports = function(app, http, io) {

	io.on('connection', function(socket){
		socket.on('chat message', function(msg){
			console.log('message: ', msg);
			io.emit('chat message', msg);
		});
	});

};