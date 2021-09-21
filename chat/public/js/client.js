import store from './store.js';
import ui from './ui.js';

const socket = io('/');

socket.on('connect', () => {
  console.log(`Client：${socket.id}`);
});

const nameInput = document.querySelector('.enter-input');
const chatBtn = document.querySelector('.enter-btn');

nameInput.addEventListener('keyup', (e) => {
  store.setUserName(e.target.value);
});

chatBtn.addEventListener('click', () => {
  const checkName = store.getUserName();
  // validation can't be empty
  if (checkName) {
    ui.goToChat();
  }
});
