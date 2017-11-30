const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey. What is going on?',
    createdAt: 123
  });

  socket.emit('newMessage', {
    from: 'adminstrator@example.com',
    text: 'You have a new message!',
    createdAt: 456
  });

  socket.on('createEmail', (email) => {
    console.log('createEmail', email);
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
