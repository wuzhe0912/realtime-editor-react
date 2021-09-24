let username = null;
let socketId = null;
let activeChatGroup = [];

const getUserName = () => {
  return username;
};

const setUserName = (value) => {
  username = value;
};

const getSocketId = () => socketId;

const setSocketId = (id) => (socketId = id);

const getActiveChatGroup = () => activeChatGroup;

const setActiveChatGroup = (chatGroup) => (activeChatGroup = chatGroup);

export default {
  getUserName,
  setUserName,
  getSocketId,
  setSocketId,
  getActiveChatGroup,
  setActiveChatGroup,
};
