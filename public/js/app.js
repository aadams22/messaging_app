$(function(){

	var socket = io();
  var m = $("<li class='l'>");
  var em = null;
  var l = null;
  var dm = null;


  $('form').submit(function(){
    socket.emit('Chat Message', $('#m').val());
    $('#m').val('');
    return false;
  });


  $('ul').on('mouseenter', '.l', 
    function(e){
    em = $(this).text();
    l = $(this);
    console.log('in ', em);
    decryptMsg(em);
    console.log('inner dm', dm);
    
  })
  .on('mouseleave', '.l', function(e){
    console.log('out', em);
    l.text(em);
    l = null;
    em = null;
    dm = null;
  });




  function decryptMsg(em){
    socket.emit('Decrypt Message', em);
  };
  


  socket.on('Chat Message', function(msg){
    $('#messages').append(m.text(msg));
    m = $("<li class='l'>");
  });

  socket.on('Recieve Decrypted Msg', function(dm){
    console.log('recieved decrypted: ', dm);
    console.log(l);
    l.text(dm);
  });

});