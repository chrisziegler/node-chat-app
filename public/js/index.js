var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

//custom event listener example
socket.on('newEmail', function(email) {
  console.log('New email', email);
});
