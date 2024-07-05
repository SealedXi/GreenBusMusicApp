import React from 'react';
import './MenuPage.css'; // Create this file for custom styling
import logo from '../assets/logo.png'; // Adjust the path as needed

const MenuPage = () => {
  return (
    <div className="menu-page">
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <button className="sign-in-button">SIGN IN</button>
    </div>
  );
};

export default MenuPage;

