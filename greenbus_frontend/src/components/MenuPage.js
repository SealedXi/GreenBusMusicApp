import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';
import logo from '../assets/logonew.png';

const MenuPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div className="menu-page">
      <img src={logo} alt="Green Bus Records Logo" className="menu-logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <button className="sign-in-button" onClick={handleSignInClick}>SIGN IN</button>
    </div>
  );
};

export default MenuPage;
