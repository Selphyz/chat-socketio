import { useRef } from "react";
import { useSockets } from "../context/socket.context"
import EVENTS from "../events/events";

export const Messages = () => {
    const { socket, messages, roomId, username, setMessages } = useSockets();
    const newMessageRef = useRef(null);
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
    }
    if (!roomId) {
        return <div />
    }
    return (
        <div>
            {messages.map(({ message }, index) => {
                return <p key={index}>{JSON.stringify(message)}</p>
            })}
            <div>
                <textarea rows={1} placeholder="Teclea" ref={newMessageRef} />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    )
}