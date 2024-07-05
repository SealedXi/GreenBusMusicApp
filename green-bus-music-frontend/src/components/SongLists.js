import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SongLists.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Album logo or cover art
import playIcon from '../assets/play.png'; // Placeholder play icon
import deleteIcon from '../assets/delete.png'; // Placeholder delete icon

const SongLists = () => {
  const navigate = useNavigate();
  const defaultSong = {
    title: "Sample Song",
    album: "Sample Album",
    artist: "Sample Artist",
    cover: logo // Using the logo as a placeholder for the album cover
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  const handlePlayClick = () => {
    // Handle play song action
    console.log("Playing song...");
  };

  const handleDeleteClick = () => {
    // Handle delete song action
    console.log("Deleting song...");
  };

  return (
    <div className="song-lists-page">
      <header className="header-banner">
        <h1>Green Bus Music App</h1>
        <button className="sort-button">SORT</button>
      </header>
      <div className="songs-section">
        <h2>Your Songs</h2>
        <div className="song-item">
          <img src={defaultSong.cover} alt="Album Cover" className="album-cover" />
          <div className="song-details">
            <p className="song-title">{defaultSong.title}</p>
            <p className="song-album">{defaultSong.album}</p>
          </div>
          <div className="song-actions">
            <button className="play-button" onClick={handlePlayClick}>
              <img src={playIcon} alt="Play" />
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          </div>
        </div>
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default SongLists;
