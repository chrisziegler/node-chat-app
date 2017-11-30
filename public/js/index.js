
const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey, this is Chris'
  });

  socket.emit('createMessage', {
    from: 'johndoe@example.com',
    text: 'Instant messaging is awesome!'
  });
});

// like 'connect' a built-in event listener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// custom event listener example
socket.on('newEmail', function (email) {
  console.log('newEmail', email);
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
