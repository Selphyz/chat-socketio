import React, { useEffect, useRef } from 'react'
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
  useEffect(() => {
    usernameRef.current.value = localStorage.getItem('username') || ''
  }, [])
  return (<div>
    {!username && (
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameInner}>
          <input placeholder="Username" ref={usernameRef} />
          <button className="cta" onClick={handleSetUsername}>Start</button>
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
