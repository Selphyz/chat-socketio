import { Server, Socket } from "socket.io"
import { nanoid } from "nanoid"
import logger from "./utils/logger"
import EVENTS from "./events/events"

const rooms: Record<string, {name: string}>={}
const socket=({io}: {io: Server})=>{
    logger.info(`Sockets active`);
    io.on(EVENTS.connection, (socket: Socket)=>{
        logger.info(`User connected ${socket.id}`);
        socket.on(EVENTS.CLIENT.create_room, ({roomName})=>{
            console.log({roomName});
            const roomId = nanoid();
            rooms[roomId]={
                name: roomName
            };
            socket.join(roomId);
            socket.broadcast.emit(EVENTS.SERVER.rooms, rooms);
            socket.emit(EVENTS.SERVER.rooms, rooms);
            socket.emit(EVENTS.SERVER.joined_room, roomId);
        })
        socket.on(EVENTS.CLIENT.send_room_message, 
          ({roomId, message, username})=>{
            const date = new Date();
            socket.to(roomId).emit(EVENTS.SERVER.room_message, {
              message,
              username,
              time: `${date.getHours()}:${date.getMinutes()}`,
            });
        });
    });
}
export default socket;