
const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// like 'connect' a built-in event listener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

