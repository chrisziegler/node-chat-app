/* eslint-disable */
const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  li.text(`${message.from}: ${formattedTime}: ${message.text}`);
  $('#messages').append(li)
});

socket.on('newLocationMessage', function (message) {
  // console.log('newLocationMessage', message);
  // will change later to use different system for rendering
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  // if we open google map in same window will disconnect from chat room
  const a = $('<a target="_blank">My current location</a>');
  // to avoid user injecting html - dont simply add all these dynamic values in template strings
  // instead set them  using these save methods like li.text, a.attr
  li.text(`${message.from}: ${formattedTime}:`);
  // you can set and fetch attributes on jQuery selected elements using this method
  // 1 argument fetches value (returns a string), 2 sets attribute
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})

/* On Submit Listener */
const messageTextbox = jQuery('[name=message]');
$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    //added this call back to clear form input
    // we don't actually need any data, just to know when server responds w/callback
   messageTextbox.val('')
  });
});

/* On Click Listener */
const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
     return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    // success handler
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    // error handler
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});