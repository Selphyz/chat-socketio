import { createContext, useContext, useState } from "react"
import io, { Socket } from "socket.io-client"
import { SOCKET_URL } from "../config/default"
import EVENTS from "../events/events";

interface Context {
    socket: Socket;
    username?: string;
    setUsername: Function;
    roomId?: string;
    rooms: object;
    messages?: { message: string, time: string, username: string }[];
    setMessages: Function;
}
const socket = io(SOCKET_URL);
const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    setMessages: () => false,
    rooms: {},
    messages: []
});
function SocketsProvider(props: any) {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState([]);
    socket.on(EVENTS.SERVER.rooms, (values) => {
        setRooms(values);
    });
    socket.on(EVENTS.SERVER.joined_room, (value) => {
        setRoomId(value);
        setMessages([]);
    });
    socket.on(EVENTS.SERVER.room_message, ({ message, username, time }) => {
        setMessages([...messages, { message, username, time }]);
    });
    return <SocketContext.Provider
        value={{ socket, username, setUsername, rooms, roomId, messages }}
        {...props} />
}
export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;