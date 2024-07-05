import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <form className="login-form">
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Password:</label>
        <input type="password" name="password" required />
        <button type="submit" className="sign-in-button">SIGN IN</button>
      </form>
      <p className="register-link">
        Don't have an account? <span onClick={handleRegisterClick}>Register now</span>
      </p>
    </div>
  );
};

export default LoginPage;
