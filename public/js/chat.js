/* eslint-disable */
const socket = io();

function scrollToBottom() {
const messages = $('#messages');
const newMessage = messages.children('li:last-child');
const clientHeight = messages.prop('clientHeight');
const scrollTop = messages.prop('scrollTop');
const scrollHeight = messages.prop('scrollHeight');
const newMessageHeight = newMessage.innerHeight();
const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  // console.log('Connected to server');
  const params = jQuery.deparam(window.location.search);
  // the event that we emit is a custom event
  // socket does have a concept of rooms, and that all takes place on the server
  // emitted by the client, and listened to by the server
  // when server hears event it's going to go through process of setting-up a room
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      // send them back to root page (index.html)
      window.location.href = '/';
    } else {
      console.log('no error')
    }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  const template = jQuery('#message-template').html();
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  const template = jQuery('#location-message-template').html();
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom()
});

/* On Submit Listener */
const messageTextbox = jQuery('[name=message]');
$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
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