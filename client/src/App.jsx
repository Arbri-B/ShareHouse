
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
  socket.on('connect', () => {
    console.log('HERE');
    setIsConnected(true);
  });

  return() => {
    socket.disconnect(true)
  };

},[])

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
            <Route path='/chatrooms' element={<Form user={user} username={username} setUsername={setUsername} socket={socket} />} />


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
