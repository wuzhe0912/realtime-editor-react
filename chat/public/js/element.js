const getChatList = (data) => {
  const { chatTitle, messageContainerID, messageInputID, chatContainerID } =
    data;

  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chat-container');
  chatContainer.setAttribute('id', chatContainerID);

  // render
  chatContainer.innerHTML = `
    <div class="chat-title-wrapper">
      <p class="chat-title">${chatTitle}</p>
    </div>
    <div class="message-container" id="${messageContainerID}">
    </div>
    <div class="message-input-wrapper">
      <input
        type="text"
        class="message-input"
        id="${messageInputID}"
        placeholder="Type Something"
      />
    </div>
  `;

  return chatContainer;
};

const getChatMessageContent = (data) => {
  const { author, messageText } = data;
  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.innerHTML = `
    <p class="message-paragraph">
      <span class="message-author">${author}：</span>${messageText}
    </p>
  `;
};

export default {
  getChatList,
  getChatMessageContent,
};
