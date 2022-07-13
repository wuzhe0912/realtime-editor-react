// import {useState} from 'react';

import styles from './Editor.module.css';
import CodeSyncLogo from 'assets/code-sync.png';

function Editor() {
  // const [clients, setClients] = useState([]);

  return (
    <div className={styles.editorWrapper}>
      <aside className={styles.asideContainer}>
        <div className={styles.asideInner}>
          <div className={styles.asideTitle}>
            <img
              src={CodeSyncLogo}
              className='logo-image'
              alt='edit-page-logo'
            />
          </div>
          <h3>Online</h3>
          <ul className={styles.onlineList}></ul>
        </div>
      </aside>
      <section></section>
    </div>
  );
}

export default Editor;
