const express = require('express');
const http = require('http');

const PORT = 5000;

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const io = require('socket.io')(server);

let connectPeers = [];

io.on('connection', (socket) => {
  console.log(`Server：${socket.id}`);

  socket.on('group-chat-message', (data) => {
    io.emit('group-chat-message', data);
  });

  socket.on('register-new-user', (userData) => {
    const { username, roomId } = userData;

    const newPeer = {
      username,
      socketId: socket.id,
      roomId,
    };

    socket.join(roomId);

    // use spread copy
    connectPeers = [...connectPeers, newPeer];
    boardcastConnectedPeers();
  });

  socket.on('direct-message', (data) => {
    const { receiverSocketId } = data;
    const hasConnectPeer = connectPeers.find(
      (peer) => peer.socketId === receiverSocketId
    );

    if (hasConnectPeer) {
      const authorData = {
        ...data,
        isAuthor: true,
      };
      socket.emit('direct-message', authorData);
      io.to(receiverSocketId).emit('direct-message', data);
    }
  });

  // listen leave chat user
  socket.on('disconnect', () => {
    connectPeers = connectPeers.filter((peer) => {
      return peer.socketId !== socket.id;
    });
    boardcastConnectedPeers();

    const data = {
      socketIdOfDisconnectPeer: socket.id,
    };
    io.emit('peer-disconnected', data);
  });
});

const boardcastConnectedPeers = () => {
  const data = {
    connectPeers,
  };

  io.emit('active-peers', data);
};

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
