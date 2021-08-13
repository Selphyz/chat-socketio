import { useRef } from "react";
import { useSockets } from "../context/socket.context"
import EVENTS from "../events/events";

export const Rooms = () => {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef(null);
    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || '';
        if (!String(roomName).trim()) return;
        socket.emit(EVENTS.CLIENT.create_room, { roomName });
        newRoomRef.current.value = '';
    }
    return (<nav>
        <div><input ref={newRoomRef} placeholder="Room name" />
            <button onClick={handleCreateRoom}>Create room</button>
        </div>
        {Object.keys(rooms).map((key) => {
            return <div key={key}>{key}&nbsp;{rooms[key].name}</div>
        })}
    </nav>
    );
}