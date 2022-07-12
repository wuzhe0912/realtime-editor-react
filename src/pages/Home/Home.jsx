import CodeSyncLogo from 'assets/code-sync.png';
import styles from './Home.module.css';

function Home() {
  return (
    <main className={styles.homeWrapper}>
      <section className={styles.formWrapper}>
        <img
          src={CodeSyncLogo}
          className={styles.homeLogo}
          alt='code-sync-logo'
        />
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
          <span className={styles.createInfo}>
            If you don't have an invite then create new &nbsp;
            <a href='https://www.google.com/' className={styles.createNewRoom}>
              new room
            </a>
          </span>
        </div>
      </section>
      <footer>
        <h4>
          Built with React by&nbsp;
          <a
            href='https://github.com/wuzhe0912'
            target='_blank'
            rel='noreferrer noopener'
          >
            Pitt Wu
          </a>
        </h4>
      </footer>
    </main>
  );
}

export default Home;
