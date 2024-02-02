import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function LoginPage() {

    return (
        <>
            <div className="d-flex justify-content-betweem">
                <h1>Arbri</h1>
                <Login />
                <Register />
            </div>

        </>

    )
}

export default LoginPage
