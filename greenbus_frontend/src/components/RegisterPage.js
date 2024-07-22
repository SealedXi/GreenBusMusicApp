import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Create this file for custom styling
import logo from '../assets/logo.png';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/register', { username, email, password });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <p>Please input your information to register a new account:</p>
      <form className="register-form" onSubmit={handleRegisterSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="register-button">REGISTER</button>
      </form>
      <button className="register-button" onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default RegisterPage;
