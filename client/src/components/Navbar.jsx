import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../AuthContext';

const Navbar =() => {
    const { logout } = useAuth();
    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            // Call the logout function from the AuthContext
            await logout();
            navigate('/')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            // Handle registration error
        }
    };

    return (
        <nav className="main-nav d-flex justify-content-between ">
            <Link className="nav-home" to={`/dashboard`}>ShareHouse</Link>
            <div className="nav-btn-holder d-flex justify-content-between">
            <Link className=" btn btn-outline-primary custom-color" to={'/post/new'}>Create a new post</Link>
            <Link className=" btn btn-outline-primary custom-color" to={'/chatform'}>Chatrooms</Link>
            <button className=" btn btn-outline-primary custom-color" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar;