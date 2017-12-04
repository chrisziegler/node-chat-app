const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined the room'));
  // our listener for the client createMessage event
  // it receives this event from a single client
  // and emits it to everyone including the initiator as a confirmation/posting for forum
  // need to emit this event from client dev console until html form input
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // message to everyone including initiator
    io.emit('newMessage', generateMessage(message.from, message.text));
  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
