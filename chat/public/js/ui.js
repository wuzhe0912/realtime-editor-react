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
    chatTitle: 'Public Chat',
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

const updateActiveChatGroup = (data) => {
  const { connectPeers } = data;
  const userSocketId = store.getSocketId();
  const activeChatGroups = store.getActiveChatGroup();

  connectPeers.forEach((peer) => {
    const isRepeat = activeChatGroups.find((node) => {
      return peer.socketId === node.socketId;
    });

    if (!isRepeat && peer.socketId !== userSocketId) {
      createNewUserChatGroup(peer);
    }
  });
};

const createNewUserChatGroup = (peer) => {
  const chatTitle = peer.username;
  const messageContainerID = `${peer.socketId}-message`;
  const messageInputID = `${peer.socketId}-input`;
  const chatContainerID = peer.socketId;

  const data = {
    chatTitle,
    messageContainerID,
    messageInputID,
    chatContainerID,
  };

  const chatGroup = element.getChatList(data);
  const chatList = document.querySelector('.chat-list');
  chatList.appendChild(chatGroup);

  // register event & send message to other user
  const newMessageInput = document.getElementById(messageInputID);
  newMessageInput.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key === 'Enter') {
      const author = store.getUserName();
      const messageContent = e.target.value;
      const receiverSocketId = peer.socketId;
      const authorSocketId = store.getSocketId();

      const data = {
        author,
        messageContent,
        receiverSocketId,
        authorSocketId,
      };

      socketHandler.sendDirectMessage(data);
      newMessageInput.value = '';
    }
  });

  // push new user to chat group
  const activeChatGroup = store.getActiveChatGroup();
  const newActiveChatGroup = [...activeChatGroup, peer];
  store.setActiveChatGroup(newActiveChatGroup);
};

const appendDirectChatMessage = (messageData) => {
  const { authorSocketId, author, messageContent, receiverSocketId, isAuthor } =
    messageData;
  const messageWrapper = isAuthor
    ? document.getElementById(`${receiverSocketId}-message`)
    : document.getElementById(`${authorSocketId}-message`);

  if (messageWrapper) {
    const data = {
      author,
      textContent: messageContent,
      alighRight: isAuthor ? true : false,
    };
    const message = element.getDirectChatMessage(data);
    messageWrapper.appendChild(message);
  }
};

export default {
  goToChat,
  appendChatMessage,
  updateActiveChatGroup,
  appendDirectChatMessage,
};
