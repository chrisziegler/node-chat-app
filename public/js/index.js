
const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'johndoe@example.com',
    text: 'Instant messaging is awesome!'
  });
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// like 'connect' a built-in event listener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

