import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/admin/login/', { email, password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token); 
                navigate('/dashboard'); 
            })
            .catch(error => {
                alert("Invalid credentials!"); // Show error
                console.error("Login error:", error);
            });
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
