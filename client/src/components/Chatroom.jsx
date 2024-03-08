import React from "react";

const Chatroom = (props) => {

    const {socket, username, setUsername} = props;

    socket.on('now-user-joined', data => {
        console.log(data);
    })

    return (
        <div>Chatroom</div>
    )
}

export default Chatroom;