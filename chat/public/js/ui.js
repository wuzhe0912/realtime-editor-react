import store from './store.js';
import element from './element.js';

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
const chatContainerID = 'chatContainerID';

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
      const messageContent = event.target.value;

      messageInput.value = '';
      console.log({
        author,
        messageContent,
      });
    }
  });
};

export default {
  goToChat,
};
