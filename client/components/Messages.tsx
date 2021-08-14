import { useEffect, useRef } from "react";
import { useSockets } from "../context/socket.context"
import EVENTS from "../events/events";
import styles from "../styles/Messages.module.css";

export const Messages = () => {
    const { socket, messages, roomId, username, setMessages } = useSockets();
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    function handleSendMessage() {
        const message = newMessageRef.current.value;
        if (!String(message).trim()) {
            return;
        }
        socket.emit(EVENTS.CLIENT.send_room_message, { roomId, message, username });
        const date = new Date();
        setMessages([
            ...messages, {
                username,
                message,
                time: `${date.getHours()}:${date.getMinutes}`
            },
        ]);
        newMessageRef.current.value = "";
    }
    if (!roomId) {
        return <div />
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.messageList}>
                {messages.map(({ message, username, time }, index) => {
                    return (<div key={index} className={styles.message}>
                        <div className={styles.messageInner}>
                            <span className={styles.messageSender}>{username} - {time}</span>
                            <span className={styles.messageBody}>{message}</span>
                        </div>
                    </div>);
                })}
                <div ref={messageEndRef} />
            </div>
            <div className={styles.messageBox}>
                <textarea rows={1} placeholder="Teclea" ref={newMessageRef} />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    )
}