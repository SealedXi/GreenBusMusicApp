import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/logo.png';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in local storage
      navigate('/profile');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Green Bus Records Logo" className="login-logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="sign-in-button">SIGN IN</button>
      </form>
      <p className="register-link">
        Don't have an account? <span onClick={handleRegisterClick}>Register now</span>
      </p>
    </div>
  );
};

export default LoginPage;