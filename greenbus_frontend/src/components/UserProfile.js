import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Import the updated CSS file
import logo from '../assets/logo.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: '', username: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }else{
        navigate('/login');
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/');
  };

  const handleViewSongsClick = () => {
      if(user==null){
          navigate('/login');
      }
    navigate('/view-songs', { state: { userId: user.id } }); // Pass user ID as state
  };

  const handleUploadSongsClick = () => {
      if(user==null){
          navigate('/login');
      }
    navigate('/upload-songs', { state: { userId: user.id } }); // Pass user ID as state
  };

  return (
    <div className="user-profile-page">
      <header className="header-banner">
        You have arrived at your destination...
      </header>
      <img src={logo} alt="Green Bus Records Logo" className="userprofile-logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <h2>Welcome, {user.username}!</h2>
      <div className="profile-section">
        <h3>Your profile</h3>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="buttons-container">
        <button className="view-songs-button" onClick={handleViewSongsClick}>VIEW YOUR SONGS</button>
        <button className="upload-songs-button" onClick={handleUploadSongsClick}>UPLOAD SONGS</button>
      </div>
      <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default UserProfile;
