import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadSongs.css'; // Import the CSS file

const UploadSongs = () => {
  const navigate = useNavigate();
  const [songFile, setSongFile] = useState(null);
  const [coverArtFile, setCoverArtFile] = useState(null);

  const handleSongFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleCoverArtFileChange = (event) => {
    setCoverArtFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle the file upload
    console.log("Uploading files...");
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
          <input type="text" id="songTitle" placeholder="Enter song title" />
        </div>
        <div className="input-group">
          <label htmlFor="songAlbum">Song Album</label>
          <input type="text" id="songAlbum" placeholder="Enter song album" />
        </div>
        <div className="file-group">
          <label className="file-label">
            <input type="file" onChange={handleSongFileChange} />
            Choose Song File
          </label>
          <span className="file-name">{songFile ? songFile.name : "No file selected"}</span>
        </div>
        <div className="file-group">
          <label className="file-label">
            <input type="file" onChange={handleCoverArtFileChange} />
            Choose Cover Art File
          </label>
          <span className="file-name">{coverArtFile ? coverArtFile.name : "No file selected"}</span>
        </div>
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadSongs;
