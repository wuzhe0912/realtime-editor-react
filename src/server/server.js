const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer(app);

const socketIo = new Server(httpServer);

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
