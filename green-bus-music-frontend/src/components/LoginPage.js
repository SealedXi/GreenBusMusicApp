import React from 'react';
import './LoginPage.css'; // Create this file for custom styling
import logo from '../assets/logo.png'; // Adjust the path as needed

const LoginPage = () => {
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
    </div>
  );
};

export default LoginPage;
