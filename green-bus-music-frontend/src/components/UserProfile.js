import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Import the updated CSS file
import logo from '../assets/logo.png';

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleViewSongsClick = () => {
    // Navigate to the songs page or perform another action
    console.log("Redirecting to songs...");
  };

  return (
    <div className="user-profile-page">
      <header className="header-banner">
        You have arrived at your destination...
      </header>
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <h2>Welcome!</h2>
      <div className="profile-section">
        <h3>Your profile</h3>
        <p>Username: Placeholder</p>
        <p>Email: Placeholder</p>
      </div>
      <button className="view-songs-button" onClick={handleViewSongsClick}>VIEW YOUR SONGS</button>
      <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default UserProfile;
