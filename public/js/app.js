$(function(){

//======================
//VARIABLE DEFINITIONS
//======================
  var socket      = io();
  var m           = $("<li class='l'>");
  var l           = null;
  var em          = null;
  var dm          = null;
  var overlay     = true;
  var usn         = null;
  var text        = null;

//======================
//FUNCTIONALITY
//======================
  $('#overlay > form').submit(function(e){
    event.preventDefault();
    usn = $(this).children().val();
    console.log('this is usn: ', usn);
    socket.username = usn;
    socket.emit('Current User', usn);
    $('h1').text(usn);
  });


  $('section > form').submit(function(){
    //sends value of user entered text to backend over ws to be encrypted and submitted 
    socket.emit('Chat Message', socket.username, $('#m').val());
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
    //removes username from hovered message
    socket.emit('Decrypt Message', em.split(":")[1].trim());
  };

  //creates userlist on login
  function createUserList(users){
    //!!still getting multiple copies of the same username
    for (var i = 0; i < users.length; i++) {
      if ( $('ul').find(users[i].socketId).length == 0) {
        $("#online-users").append("<li id='" + users[i].socketId + "'>" + users[i].username + "</li>");
      }
    };

    //removes overlay the first time allowing for useage;
    if (overlay) {
      $('#overlay > form > input').val('');
      $('#overlay').slideUp(500);
      overlay = false;
    }

  };


//======================
//SOCKETS
//======================
  socket.on('Update Online Users', function(users) {
    // console.log(users);
    createUserList(users);
  });

  socket.on('Chat Message', function(username, msg){
    //sets li with inner text of chat message
    $('#messages').append(m.text(username + ": " + msg));
    //resets value of m
    m = $("<li class='l'>");
  });

  socket.on('Recieve Decrypted Msg', function(dm){
    //sets inner of hovered li to decrypted text
    l.text(em.split(":")[0].trim() + ": " + dm);
  });


});