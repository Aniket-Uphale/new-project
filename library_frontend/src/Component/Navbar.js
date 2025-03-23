import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // ✅ Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token'); // ✅ Clear token on logout
        navigate('/login'); // ✅ Redirect to login page
    };

    return (
        <nav style={styles.navbar}>
            <h2>Library Management</h2>
            <div>
                <Link to="/" style={styles.link}>Home</Link>
                {token && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
                {!token && <Link to="/login" style={styles.link}>Login</Link>}
                {!token && <Link to="/signup" style={styles.link}>Signup</Link>}
                {token && <button style={styles.button} onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        margin: '0 10px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px',
    }
};

export default Navbar;
