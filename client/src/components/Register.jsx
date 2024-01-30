import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const { register } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nrMat, setNrMat] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState();

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Call the register function from the AuthContext
            await register(firstName, lastName, nrMat, gender, email, password, confirmPassword);
            navigate('/posts')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            setError('Some errors')
        }
    };

    return (
        <div className='reg-main'>
            <form className='form' onSubmit={handleRegister}>
                {
                    error ?
                        <p>{error}</p>
                        : null
                }
                <h2>Create an account</h2>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Numri i Matrikullimit:</label>
                    <input type="text" value={nrMat} onChange={(e) => setNrMat(e.target.value)} />
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Email:</label>
                    <input className='log-put' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='d-flex justify-content-between m-3'>
                    <label className='log-lab'>Confirm Password:</label>
                    <input className='log-put' type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button className='s-button' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
