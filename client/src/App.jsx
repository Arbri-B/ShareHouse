
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/AllPostsNew';
import EditPost from './components/EditPost';
import SinglePost from './components/SinglePost';
import Form from './components/Form';
import Chatroom from './components/Chatroom';
import { AuthProvider, useAuth } from './AuthContext';
import io from 'socket.io-client';


import WelcomePage from './components/WelcomePage';
function App() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const [socket] = useState(() => io(':8000'));
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log('Running');
    const socket = io(':8000');

    const handleConnect = () => {
      console.log('Connected');
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Disconnected');
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect(true);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route path='/' element={<Dashboard user={user} />} />
            <Route path='/dashboard' element={<Dashboard user={user} />} />
            <Route path='/posts' element={<Dashboard user={user} />} />
            <Route path='/post/:id' element={<SinglePost user={user} />} />
            <Route path='/post/new' element={<CreatePost user={user} />} />
            <Route path='/post/edit/:id' element={<EditPost user={user} />} />
            <Route path='/chatform' element={<Form user={user} username={username} setUsername={setUsername} socket={socket} />} />
            <Route path='/chatroom' element={<Chatroom user={user} username={username} setUsername={setUsername} socket={socket} />} />


          </>
        ) : (
          <>
            <Route path='*' element={<WelcomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>

        )}
      </Routes>


    </BrowserRouter>
  )
}

export default App
