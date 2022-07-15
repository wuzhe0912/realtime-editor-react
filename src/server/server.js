const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('../constant/Actions.js');

const httpServer = http.createServer(app);

const socketIo = new Server(httpServer);

// websocket api
socketIo.on('connection', (socket) => {
  console.log('socket', socket.id);
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
