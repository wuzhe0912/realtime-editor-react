const socket = io('');

socket.on('connect', () => {
  console.log(`Successfully connected : ${socket.id}`);
});
