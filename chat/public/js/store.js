let username = null;

const getUserName = () => {
  return username;
};

const setUserName = (value) => {
  username = value;
  console.log(username);
};

export default {
  getUserName,
  setUserName,
};
