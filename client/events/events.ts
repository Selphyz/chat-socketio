export const EVENTS = {
    connection: "connection",
    CLIENT:{
        create_room: "create_room",
        send_room_message: "send_room_message",
        join_room: "join_room"
    },
    SERVER:{
        rooms: "rooms",
        joined_room: "joined_room",
        room_message: "room_message"
    }
}
export default EVENTS;