/* eslint-disable */
const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  // console.log('newMessage', message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li)
});

socket.on('newLocationMessage', function (message) {
  // console.log('newLocationMessage', message);
  // will change later to use different system for rendering
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');
  // to avoid user injecting html - dont simply add all these dynamic values in template strings
  // instead set them  using these save methods like li.text, a.attr
  li.text(`${message.from}: `);
  // you can set and fetch attributes on jQuery selected elements using this method
  // 1 argument fetches value (returns a string), 2 sets attribute
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function (fromServCallback) {
    console.log('Not doing anything with this callback yet:', fromServCallback);
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
     return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  })
});