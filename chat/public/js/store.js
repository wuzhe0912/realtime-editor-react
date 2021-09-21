let username = null;

const getUserName = () => {
  return username;
};

const setUserName = (value) => {
  username = value;
};

export default {
  getUserName,
  setUserName,
};
