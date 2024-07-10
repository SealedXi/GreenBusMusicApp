// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserProfile.css'; // Import the updated CSS file
// import logo from '../assets/logo.png';

// const UserProfile = () => {
//   const navigate = useNavigate();

//   const handleLogoutClick = () => {
//     navigate('/');
//   };

//   const handleViewSongsClick = () => {
//     navigate('/view-songs');
//   };

//   const handleUploadSongsClick = () => {
//     navigate('/upload-songs');
//   };

//   return (
//     <div className="user-profile-page">
//       <header className="header-banner">
//         You have arrived at your destination...
//       </header>
//       <img src={logo} alt="Green Bus Records Logo" className="userprofile-logo" />
//       <h1>GREEN BUS RECORDS™</h1>
//       <h2>Welcome!</h2>
//       <div className="profile-section">
//         <h3>Your profile</h3>
//         <p>Username: John</p>
//         <p>Email: abc@abc.com</p>
//       </div>
//       <div className="buttons-container">
//         <button className="view-songs-button" onClick={handleViewSongsClick}>VIEW YOUR SONGS</button>
//         <button className="upload-songs-button" onClick={handleUploadSongsClick}>UPLOAD SONGS</button>
//       </div>
//       <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
//     </div>
//   );
// };

// export default UserProfile;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Import the updated CSS file
import logo from '../assets/logo.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email } = location.state || { username: 'John', email: 'abc@abc.com' };

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleViewSongsClick = () => {
    navigate('/view-songs');
  };

  const handleUploadSongsClick = () => {
    navigate('/upload-songs');
  };

  return (
    <div className="user-profile-page">
      <header className="header-banner">
        You have arrived at your destination...
      </header>
      <img src={logo} alt="Green Bus Records Logo" className="userprofile-logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <h2>Welcome!</h2>
      <div className="profile-section">
        <h3>Your profile</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
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
