import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Client from 'components/Client/Client';
import EditorComponent from 'components/EditorComponent/EditorComponent';
// styles
import styles from './Editor.module.css';
import CodeSyncLogo from 'assets/code-sync.png';

function Editor() {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Minecraft' },
    { socketId: 2, username: 'Paint' },
    { socketId: 3, username: 'Carol' },
  ]);
  const reactNavigator = useNavigate();

  function leaveRoom() {
    reactNavigator('/');
  }

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
          {
            <div className={styles.clientsList}>
              {clients.map((node) => (
                <Client key={node.socketId} username={node.username} />
              ))}
            </div>
          }
        </div>
        <div className='btn-group'>
          <button className='btn btn-copy'>Copy Room ID</button>
          <button className='btn btn-leave' onClick={leaveRoom}>
            Leave
          </button>
        </div>
      </aside>
      <section className='editor-content'>
        <EditorComponent />
      </section>
    </div>
  );
}

export default Editor;
