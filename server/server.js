const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(publicPath));


// allows us to register an event listener
// connection -the most populat built-in event
//socket argument is similiar to the one we use in index.html
// represents the individual socket, as opposed to all the users connected to the server
io.on('connection', (socket) => {
    console.log('New user connected');
});

server.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})