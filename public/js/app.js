$(function(){

	var socket = io();
  var m = $("<li class='l'>");
  var li = $('.l');
  var em = null;
  var l = null;
  var dm = null;


  $('form').submit(function(){
    socket.emit('Chat Message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $(m)
  .mouseenter(function(e){
    em = $(this).text();

    console.log('in ', em);
    decryptMsg(em);
  })
  .mouseleave(function(e){
    console.log('out');
  });




  function decryptMsg(em){
    socket.emit('Decrypt Message', em);
  };
  


  socket.on('Chat Message', function(msg){
    $('#messages').append(m.text(msg));
    m = $("<li class='l'>");
  });

  socket.on('Recieve Decrypted Msg', function(dm){
    // console.log('recieved decrypted: ', dm);
    console.log(dm);
    
  });

});