import store from './store.js';
import ui from './ui.js';
import socketHandler from './socket/handler.js';

const nameInput = document.querySelector('.enter-input');
const chatBtn = document.querySelector('.enter-btn');

nameInput.addEventListener('keyup', (e) => {
  store.setUserName(e.target.value);
});

nameInput.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key === 'Enter') {
    validationInput(store.getUserName());
  }
});

chatBtn.addEventListener('click', () => {
  validationInput(store.getUserName());
});

const validationInput = (username) => {
  if (username) {
    ui.goToChat();
    socketHandler.connectSocketIoServer();
  }
};
