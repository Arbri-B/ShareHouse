
import React, { useState } from "react";

const Chatroom = (props) => {

    const { socket, username, setUsername } = props;
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("");
    const [messages, setMessages] =useState([]);

    socket.on('new-user-joined', data => {
        console.log(data);
        setUsers(data)
    })

    socket.on('send-message-to-all-clients', data => {
        setMessages([...messages, data]);
    })

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send-message', {message:input, username:username})
    }

    return (
        <div>
            <div>Welcome {username} to the Chatroom</div>
            {
                users.map((user) => (
                    <p>{user.username} joined the chat!</p>
                ))
            }

            <form onSubmit={sendMessage}>
                <label>Message: </label>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button>Send Message</button>
            </form>
            
                {
                    messages.map((message) => (
                        <p>{message.username} says: {message.message}</p>
                    ))
                }
                
        </div>
    )
}

export default Chatroom;