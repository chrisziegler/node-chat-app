const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
  // broadcast to everyone on the connection but initiator
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined the room'));
  // listen for the client setting up room event
  socket.on('join', (params, callback) => {
  // created validation function in utils
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    callback();
  });
  // our listener for the client createMessage event
  socket.on('createMessage', (message, callback) => {
    // message to everyone including initiator
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
