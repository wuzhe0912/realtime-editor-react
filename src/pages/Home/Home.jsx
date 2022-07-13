import { useState } from 'react';
import HomeFooter from './HomeFooter';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './Home.module.css';
import CodeSyncLogo from 'assets/code-sync.png';

function Home() {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const generateNewID = () => {
    const id = uuidv4();
    setRoomId(id);
    toast.success('New ID Generated!');
  };

  const joinRoom = () => {
    if (roomId && userName) {
      // redirect to editor page
      navigate(`/editor/${roomId}`, {
        state: {
          userName,
        },
      });
      initialData();
    } else {
      toast.error('Please enter room ID and user name!');
    }
  };

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      joinRoom();
    }
  };

  const initialData = () => {
    setRoomId('');
    setUserName('');
  };

  return (
    <article className={styles.homeWrapper}>
      <section className={styles.formWrapper}>
        <div className={styles.formTitle}>
          <h1>CodeSync Editor</h1>
          <img src={CodeSyncLogo} className='logo-image' alt='code-sync-logo' />
        </div>
        <h4 className={styles.inviteRoomId}>Paste invitation ROOM ID</h4>
        <div className={styles.inputContainer}>
          <input
            type='text'
            className={styles.inputBox}
            placeholder='ROOM ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type='text'
            className={styles.inputBox}
            placeholder='USERNAME'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className='btn btn-join' onClick={joinRoom}>
            Join
          </button>
          <div className={styles.createInfo}>
            If you don't have invite ID then generate &nbsp;
            <span onClick={generateNewID} className={styles.createNewRoom}>
              New ID
            </span>
          </div>
        </div>
      </section>
      <HomeFooter />
    </article>
  );
}

export default Home;
