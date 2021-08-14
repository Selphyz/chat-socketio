import { useRef } from "react";
import { useSockets } from "../context/socket.context"
import EVENTS from "../events/events";
import styles from "../styles/Room.module.css"

export const Rooms = () => {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef(null);
    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || '';
        if (!String(roomName).trim()) return;
        socket.emit(EVENTS.CLIENT.create_room, { roomName });
        newRoomRef.current.value = '';
    }
    const handleJoinRoom = (roomKey: string) => {
        if (roomId === roomKey) return;
        socket.emit(EVENTS.CLIENT.join_room, roomKey);
    }
    return (<nav className={styles.wrapper}>
        <div className={styles.createRoomWrapper}>
            <input ref={newRoomRef} placeholder="Room name" />
            <button onClick={handleCreateRoom}>Create room</button>
        </div>
        <ul className={styles.roomList}>
            {Object.keys(rooms).map((roomKey) => {
                return <div key={roomKey}>
                    <button disabled={roomKey === roomId}
                        title={`Join ${rooms[roomKey].name}`}
                        onClick={() => handleJoinRoom(roomKey)}
                    >{roomKey === roomId ? 'active room' : null}&nbsp;{rooms[roomKey].name}
                    </button>
                </div>
            })}
        </ul>
    </nav>
    );
}