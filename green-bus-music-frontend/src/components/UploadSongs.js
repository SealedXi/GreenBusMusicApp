import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadSongs.css'; // Import the CSS file

const UploadSongs = () => {
  const navigate = useNavigate();
  const [songTitle, setSongTitle] = useState('');
  const [songAlbum, setSongAlbum] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [coverArtFile, setCoverArtFile] = useState(null);

  const handleSongFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleCoverArtFileChange = (event) => {
    setCoverArtFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (songTitle && songAlbum && songFile && coverArtFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const songData = {
          title: songTitle,
          album: songAlbum,
          // Simulating a file URL (in practice, save files in IndexedDB or similar storage)
          songUrl: URL.createObjectURL(songFile),
          coverArtUrl: URL.createObjectURL(coverArtFile),
        };
        const songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(songData);
        localStorage.setItem('songs', JSON.stringify(songs));
        navigate('/view-songs');
      };
      reader.readAsDataURL(songFile);
    } else {
      alert('Please fill in all fields and select both files.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="upload-songs-page">
      <header className="header-banner">
        <h1>Upload Songs</h1>
      </header>
      <div className="upload-form">
        <div className="input-group">
          <label htmlFor="songTitle">Song Title</label>
          <input
            type="text"
            id="songTitle"
            placeholder="Enter song title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="songAlbum">Song Album</label>
          <input
            type="text"
            id="songAlbum"
            placeholder="Enter song album"
            value={songAlbum}
            onChange={(e) => setSongAlbum(e.target.value)}
          />
        </div>
        <div className="file-group">
          <label className="file-label">
            <input type="file" onChange={handleSongFileChange} />
            Choose Song File
          </label>
          <span className="file-name">{songFile ? songFile.name : 'No file selected'}</span>
        </div>
        <div className="file-group">
          <label className="file-label">
            <input type="file" onChange={handleCoverArtFileChange} />
            Choose Cover Art File
          </label>
          <span className="file-name">{coverArtFile ? coverArtFile.name : 'No file selected'}</span>
        </div>
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadSongs;
