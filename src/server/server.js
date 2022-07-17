const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('../constant/Actions.js');

const httpServer = http.createServer(app);
const socketIo = new Server(httpServer);

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  return Array.from(socketIo.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    },
  );
}

// websocket api
socketIo.on('connection', (socket) => {
  console.log(1, 'server', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    console.log(2, userSocketMap[socket.id]);
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      socketIo.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
