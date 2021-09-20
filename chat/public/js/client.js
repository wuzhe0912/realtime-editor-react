import store from './store.js';

const socket = io('/');

socket.on('connect', () => {
  console.log(`Client：${socket.id}`);
});

const nameInput = document.querySelector('.enter-input');

nameInput.addEventListener('keyup', (e) => {
  store.setUserName(e.target.value);
});
