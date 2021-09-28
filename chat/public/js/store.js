let username = null;
let socketId = null;
let activeChatGroup = [];
let roomId = 'Cars';

const getUserName = () => username;
const setUserName = (name) => (username = name);
const getSocketId = () => socketId;
const setSocketId = (id) => (socketId = id);
const getActiveChatGroup = () => activeChatGroup;
const setActiveChatGroup = (chatGroup) => (activeChatGroup = chatGroup);
const getRoomId = () => roomId;
const setRoomId = (id) => (roomId = id);

export default {
  getUserName,
  setUserName,
  getSocketId,
  setSocketId,
  getActiveChatGroup,
  setActiveChatGroup,
  getRoomId,
  setRoomId,
};
