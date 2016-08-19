$(function(){

//======================
//VARIABLE DEFINITIONS
//======================
	var socket = io();
  var m      = $("<li class='l'>");
  var l      = null;
  var em     = null;
  var dm     = null;


//======================
//FUNCTIONALITY
//======================
  $('form').submit(function(){
    //sends value of user entered text to backend over ws to be encrypted and submitted 
    socket.emit('Chat Message', $('#m').val());
    //resets value of submition input to empty;
    $('#m').val('');
    return false;
  });


  $('ul').on('mouseenter', '.l', 
    function(e){
      em = $(this).text();
      l = $(this);
      decryptMsg(em);
  })
  .on('mouseleave', '.l', function(e){
    //reset inner text to original encryption
    l.text(em);
    //reset values to null
    l = null;
    em = null;
    dm = null;
  });


//======================
//FUNCTION DEFINITIONS
//======================
  //sends encrypted value over hovered item to backend to be decrypted
  function decryptMsg(em){
    socket.emit('Decrypt Message', em);
  };
  
//======================
//SOCKETS
//======================
  socket.on('Chat Message', function(msg){
    $('#messages').append(m.text(msg));
    m = $("<li class='l'>");
  });

  socket.on('Recieve Decrypted Msg', function(dm){
    //sets inner of hovered li to decrypted text
    l.text(dm);
  });

});