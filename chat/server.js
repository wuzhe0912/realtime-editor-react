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
    console.log(data);
    io.emit('group-chat-message', data);
  });

  socket.on('register-new-user', (userData) => {
    const { username } = userData;

    const newPeer = {
      username,
      socketId: socket.id,
    };

    connectPeers = [...connectPeers, newPeer];
    console.log('Connected：', connectPeers);
  });

  socket.on('disconnect', () => {
    connectPeers = connectPeers.filter((peer) => {
      return peer.socketId !== socket.id;
    });
    console.log('Disconnect：', connectPeers);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
