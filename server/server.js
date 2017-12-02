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
  // here we can use the socket variable to emit to just one user directly
  // we need to leverage the clients 'newMessage' listener for this emission
  // which captures the 'message' in its callback
  // here we just generate all the properties
  // unlike responding to createMessage from the user below
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Expanse Chat',
    createdAt: new Date().getTime()
  });
  // broadcast to everyone on the connection but initiator
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user just joined the room',
    createdAt: new Date().getTime()
  });

  // our listener for the client createMessage event
  // it receives this event from a single client
  // and emits it to everyone including the initiator as a confirmation/posting for forum
  // need to emit this event from client dev console until html form input
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // message to everyone including initiator
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
