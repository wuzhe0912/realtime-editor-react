import ui from '../ui.js';
import store from '../store.js';

let socket = null;

const connectSocketIoServer = () => {
  socket = io('/');

  socket.on('connect', () => {
    console.log(`Successfully Connect：${socket.id}`);
    store.setSocketId(socket.id);
    registerActiveSession();
  });

  socket.on('group-chat-message', (data) => {
    ui.appendChatMessage(data);
  });

  socket.on('active-peers', (data) => {
    ui.updateActiveChatGroup(data);
  });

  socket.on('direct-message', (data) => {
    ui.appendDirectChatMessage(data);
  });
};

const registerActiveSession = () => {
  const userData = {
    username: store.getUserName(),
  };
  socket.emit('register-new-user', userData);
};

const sendGroupChatMessage = (author, messageText) => {
  const messageData = {
    author,
    messageText,
  };

  socket.emit('group-chat-message', messageData);
};

const sendDirectMessage = (data) => {
  socket.emit('direct-message', data);
};

export default {
  connectSocketIoServer,
  sendGroupChatMessage,
  sendDirectMessage,
};
