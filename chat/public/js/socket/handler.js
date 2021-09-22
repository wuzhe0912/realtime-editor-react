let socket = null;

const connectSocketIoServer = () => {
  socket = io('/');

  socket.on('connect', () => {
    console.log(`Successfully Connect：${socket.id}`);
  });
};

const sendGroupChatMessage = (author, messageText) => {
  const messageData = {
    author,
    messageText,
  };

  socket.emit('group-chat-message', messageData);
};

export default {
  connectSocketIoServer,
  sendGroupChatMessage,
};
