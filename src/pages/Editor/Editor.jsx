import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Client from 'components/Client/Client';
import EditorContent from 'components/EditorContent/EditorContent';
import { initSocket } from 'server/socket';
import ACTIONS from 'constant/Actions';
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from 'react-router-dom';
// styles
import commonStyles from 'common/common.module.css';
import styles from './Editor.module.css';
import CodeSyncLogo from 'assets/code-sync.png';

const Editor = () => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  const init = async () => {
    socketRef.current = await initSocket();
    // check connection status, if disconnected then redirect to home and show error toast
    socketRef.current.on('connect_error', (error) => {
      return handleErrors(error);
    });
    socketRef.current.on('connect_failed', (error) => {
      return handleErrors(error);
    });

    function handleErrors(error) {
      toast.error('Socket connection failed, try again later.');
      console.log('socket error', error);
      reactNavigator('/');
    }

    // connect is successful, join room
    socketRef.current.emit(ACTIONS.JOIN, {
      roomId,
      username: location.state?.userName,
    });

    // listen to join message from server
    socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
      // not current room user
      if (username !== location.state?.userName) {
        toast.success(`${username} joined the room.`);
        console.log(`${username} joined`);
      }
      setClients(clients);
      // send sync code message to server
      socketRef.current.emit(ACTIONS.SYNC_CODE, {
        code: codeRef.current,
        socketId,
      });
    });

    // listening user is disconnected or not
    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      toast.success(`${username} left the room.`);
      setClients((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
    });

    // listening for disconnection
    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      toast.success(`${username} left the room.`);
      setClients((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
    });
  };

  const copyRoomId = async () => {
    try {
      navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    } catch (error) {
      toast.error('Could not copy the Room ID');
      console.log(error);
    }
  };

  function leaveRoom() {
    reactNavigator('/');
  }

  // block illegal navigation and redirect to home
  if (!location.state) {
    return <Navigate to='/' />;
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
          <button
            className={`${commonStyles.btn} ${commonStyles.btnCopy}`}
            onClick={copyRoomId}
          >
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
        <EditorContent
          roomId={roomId}
          socketRef={socketRef}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </section>
    </div>
  );
};

export default Editor;
