import Avatar from 'react-avatar';
import styles from './Client.module.css';

const Client = ({ username }) => {
  return (
    <div className={styles.clientItem}>
      <Avatar name={username} size={50} round='14px'></Avatar>
      <span className={styles.clientItemText}>{username}</span>
    </div>
  );
};

export default Client;
