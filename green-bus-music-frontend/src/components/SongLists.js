import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SongLists.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Album logo or cover art
import playIcon from '../assets/play.png'; // Placeholder play icon
import deleteIcon from '../assets/delete.png'; // Placeholder delete icon
import axios from 'axios';

const SongLists = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve userId from location state
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!userId) {
        console.error('No userId provided');
        return;
      }

      try {
        const response = await axios.get(`/api/songs/user/${userId}`);
        setSongs(response.data);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      }
    };

    fetchSongs();
  }, [userId]);

  const handleBackClick = () => {
    navigate('/profile');
  };

  const handlePlayClick = (song) => {
    // Handle play song action
    console.log(`Playing song: ${song.title}`);
  };

  const handleDeleteClick = async (songId) => {
    try {
      await axios.delete(`/api/songs/${songId}`);
      setSongs(songs.filter(song => song.id !== songId));
      console.log(`Deleted song with id: ${songId}`);
    } catch (error) {
      console.error('Failed to delete song', error);
    }
  };

  return (
    <div className="song-lists-page">
      <header className="header-banner">
        <h1>Green Bus Music App</h1>
        <button className="sort-button">SORT</button>
      </header>
      <div className="songs-section">
        <h2>Your Songs</h2>
        {songs.map(song => (
          <div key={song.id} className="song-item">
            <img src={song.cover || logo} alt="Album Cover" className="album-cover" />
            <div className="song-details">
              <p className="song-title">{song.title}</p>
              <p className="song-album">{song.album}</p>
            </div>
            <div className="song-actions">
              {/* <button className="play-button" onClick={() => handlePlayClick(song)}>
                <img src={playIcon} alt="Play" />
              </button> */}
              <button className="delete-button" onClick={() => handleDeleteClick(song.id)}>
                <img src={deleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        ))}
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default SongLists;
