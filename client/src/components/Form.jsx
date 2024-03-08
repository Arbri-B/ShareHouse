import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
    const {socket, username, setUsername} = props;
    const navigate = useNavigate()

    const joinServer = (e) => {
        e.preventDefault();
        socket.emit('join-server', username);
        navigate('/chatroom');
    }

    return(
        <div>
            <form onSubmit={joinServer}>
                <h2>Create a username to join server</h2>
                <label>Username:</label>
                <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button>Join</button>
            </form>

        </div>
    )
}

export default Form;