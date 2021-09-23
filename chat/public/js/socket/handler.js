import ui from '../ui.js';
import store from '../store.js';

let socket = null;

const connectSocketIoServer = () => {
  socket = io('/');

  socket.on('connect', () => {
    console.log(`Successfully Connect：${socket.id}`);
    registerActiveSession();
  });

  socket.on('group-chat-message', (data) => {
    console.log(data);
    ui.appendChatMessage(data);
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

export default {
  connectSocketIoServer,
  sendGroupChatMessage,
};
