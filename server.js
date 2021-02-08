const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

var allClients = [];
io.on('connection', (socket) => {
  socket.emit('your id', socket.id);
  socket.on('send message', (body) => {
    io.emit('message', body);
  });

  socket.on('disconnect', function () {
    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  });
});

server.listen(8000, () => console.log('server is running on port 8000'));
