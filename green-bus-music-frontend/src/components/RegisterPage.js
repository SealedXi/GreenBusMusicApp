import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Create this file for custom styling
import logo from '../assets/logo.png';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <p>Please input your information to register a new account:</p>
      <form className="register-form">
        <label>Username:</label>
        <input type="text" name="username" required />
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Password:</label>
        <input type="password" name="password" required />
        <button type="submit" className="register-button">REGISTER</button>
      </form>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default RegisterPage;
