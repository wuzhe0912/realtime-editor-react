import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Client from 'components/Client/Client';
import EditorContent from 'components/EditorContent/EditorContent';
// styles
import commonStyles from 'common/common.module.css';
import styles from './Editor.module.css';
import CodeSyncLogo from 'assets/code-sync.png';

function Editor() {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Minecraft' },
    { socketId: 2, username: 'Paint' },
    { socketId: 3, username: 'Carol' },
    { socketId: 4, username: 'Steam' },
    { socketId: 5, username: 'Empire Age II' },
  ]);
  const reactNavigator = useNavigate();

  function leaveRoom() {
    reactNavigator('/');
  }

  return (
    <div className={styles.editorWrapper}>
      <aside className={styles.asideContainer}>
        <div className={styles.asideTitle}>
          <img
            src={CodeSyncLogo}
            className={commonStyles.logoImage}
            alt='edit-page-logo'
          />
        </div>
        <h3 className={styles.asideOnline}>Online</h3>
        {
          <div className={styles.clientsList}>
            {clients.map((node) => (
              <Client key={node.socketId} username={node.username} />
            ))}
          </div>
        }
        <div className={styles.btnGroup}>
          <button className={`${commonStyles.btn} ${commonStyles.btnCopy}`}>
            Copy Room ID
          </button>
          <button
            className={`${commonStyles.btn} ${commonStyles.btnLeave}`}
            onClick={leaveRoom}
          >
            Leave
          </button>
        </div>
      </aside>
      <section className='editor-content'>
        <EditorContent />
      </section>
    </div>
  );
}

export default Editor;
