import store from './store.js';
import element from './element.js';
import socketHandler from './socket/handler.js';

const goToChat = () => {
  const enterPage = document.querySelector('.enter-box');
  const chatPage = document.querySelector('.chat-box');

  enterPage.classList.add('display-none');

  chatPage.classList.remove('display-none');
  chatPage.classList.add('display-flex');

  const username = store.getUserName();
  updateUserName(username);

  createChatList();
};

const updateUserName = (username) => {
  const usernameLabel = document.querySelector('.username-label');
  usernameLabel.innerHTML = username;
};

const messageContainerID = 'message-container-id';
const messageInputID = 'message-input-id';
const chatContainerID = 'chat-container-id';

const createChatList = () => {
  // default value
  const data = {
    chatTitle: 'Group Name',
    messageContainerID,
    messageInputID,
    chatContainerID,
  };

  const chatContainer = element.getChatList(data);

  const chatListElement = document.querySelector('.chat-list');
  chatListElement.appendChild(chatContainer);

  const messageInput = document.getElementById(messageInputID);
  messageInput.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'Enter') {
      const author = store.getUserName();
      const messageText = event.target.value;
      // send message to socket.io server
      socketHandler.sendGroupChatMessage(author, messageText);
      // reset
      messageInput.value = '';
    }
  });
};

const appendChatMessage = (data) => {
  const groupChatMessage = document.getElementById(messageContainerID);
  const chatMessageContent = element.getChatMessageContent(data);
  groupChatMessage.appendChild(chatMessageContent);
};

export default {
  goToChat,
  appendChatMessage,
};
