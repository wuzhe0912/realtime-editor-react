import { useState } from 'react';
import HomeFooter from './HomeFooter';
import { v4 as uuidv4 } from 'uuid';
// import toast from 'react-hot-toast';
import CodeSyncLogo from 'assets/code-sync.png';
import styles from './Home.module.css';

function Home() {
  const [roomId, setRoomId] = useState('');

  const createNewRoom = (e) => {
    const id = uuidv4();
    console.log(id);
    setRoomId(id);
    // toast.success('New Room created!');
  };

  return (
    <main className={styles.homeWrapper}>
      <section className={styles.formWrapper}>
        <div className={styles.formTitle}>
          <h1>CodeSync Editor</h1>
          <img
            src={CodeSyncLogo}
            className={styles.homeLogo}
            alt='code-sync-logo'
          />
        </div>
        <h4 className={styles.inviteRoomId}>Paste invitation ROOM ID</h4>
        <div className={styles.inputContainer}>
          <input
            type='text'
            className={styles.inputBox}
            placeholder='ROOM ID'
          />
          <input
            type='text'
            className={styles.inputBox}
            placeholder='USERNAME'
          />
          <button className='btn btn-join'>Join</button>
          <div className={styles.createInfo}>
            If you don't have an invite then create &nbsp;
            <span onClick={createNewRoom} className={styles.createNewRoom}>
              new room
            </span>
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}

export default Home;
