module.exports = function(app, http, io) {
console.log('socket.io');

// var socket = io();

io.on('connection', function(){
	console.log('a user connected');
});

};