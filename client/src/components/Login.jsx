import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await login(email, password);
            navigate('/posts')
            // Redirect or perform any other actions after successful login
        } catch (error) {
            // Handle login error
        }
    };

    return (
            <div className='log-main'>
                <div>
                <h1 className='log-top'>Log In</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div  className='d-flex justify-content-around m-5 '>
                        <label className='log-lab'>Email:</label>
                        <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div  className='d-flex justify-content-around m-5'>
                        <label className='log-lab'>Password:</label>
                        <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='s-button' type="submit">Login</button>
                </form>
                </div>
                <Link className="wel-log" to={'/register'}>Dont have an account? Register here!</Link>
            </div>

            


    );
};

export default Login;
