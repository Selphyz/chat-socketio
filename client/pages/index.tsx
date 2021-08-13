import React, { useRef } from 'react'
import { Messages, Rooms } from '../components'
import { useSockets } from '../context/socket.context'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);
  const handleSetUsername = () => {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }
    setUsername(value);
    localStorage.setItem('username', value);
  }
  return (<div>
    {!username && (
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameInner}>
          <input placeholder="Username" ref={usernameRef} />
          <button onClick={handleSetUsername}>Start</button>
        </div>
      </div>
    )}
    {username && (
      <div className={styles.container}>
        <Rooms />
        <Messages />
      </div>
    )}
  </div>)
}
