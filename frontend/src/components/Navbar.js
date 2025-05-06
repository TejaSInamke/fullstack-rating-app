import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#eee', padding: '1rem' }}>
      <Link to="/">Stores</Link>
      {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      {user?.role === 'user' && <Link to="/user">Dashboard</Link>}
      {user?.role === 'owner' && <Link to="/owner">Owner</Link>}
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
