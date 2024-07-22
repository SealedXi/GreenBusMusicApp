import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UploadSongs.css'; // Import the CSS file
import axios from 'axios';

const UploadSongs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve userId from location state
  //const [ user, setUser] = useState({ });

  const [songTitle, setSongTitle] = useState('');
  const [songAlbum, setSongAlbum] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [coverArtFile, setCoverArtFile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, []);

  const handleSongFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleCoverArtFileChange = (event) => {
    setCoverArtFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!songFile || !coverArtFile) {
      alert('Please select both song and cover art files.');
      return;
    }

    const formData = new FormData();
    formData.append('title', songTitle);
    formData.append('artist', "artist");
    formData.append('album', songAlbum);
    formData.append('genre', "genre");
    formData.append('file', songFile);
    formData.append('coverImage', coverArtFile);
    formData.append('userId', userId);

    try {
      const response = await axios.post('/api/songs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(response.data);
      alert('Upload successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please try again.');
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
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            placeholder="Enter song title"
          />
        </div>
        <div className="input-group">
          <label htmlFor="songAlbum">Song Album</label>
          <input
            type="text"
            id="songAlbum"
            value={songAlbum}
            onChange={(e) => setSongAlbum(e.target.value)}
            placeholder="Enter song album"
          />
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
