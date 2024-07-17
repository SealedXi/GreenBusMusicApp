import React, { useEffect, useState , useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SongLists.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Album logo or cover art
import playIcon from '../assets/play.png'; // Placeholder play icon
import deleteIcon from '../assets/delete.png'; // Placeholder delete icon
import axios from 'axios';

import AudioPlayer from './AudioPlayer';



const SongLists = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve userId from location state
  const [songs, setSongs] = useState([]);
  const songPath = '/uploads/song/';
  const coverPath = '/uploads/cover/';

  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const fetchSongs = async () => {
      if (!userId) {
        console.error('No userId provided');
        return;
      }

      try {

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('order', 1);
        formData.append('keyword', "");

        const response = await axios.post('/api/songs/list', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        setSongs(response.data);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      }
    };

    fetchSongs();
  }, [userId]);

  // const handlePlay = () => {
  //   audioRef.current.load();
  //   audioRef.current.play();
  // };
  //
  // const handlePause = () => {
  //   audioRef.current.pause();
  // };
  //
  const handlePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });
  };

  const handleBackClick = () => {
    navigate('/profile');
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

  const getCoverImg = (path) => {
      return window.URL.createObjectURL(path);
  }

  return (
    <div className="song-lists-page">
      <header className="header-banner">
        <h1>Green Bus Music App</h1>
        <button className="sort-button">SORT</button>
      </header>
      <div className="songs-section">
        <h2>Your Songs</h2>
        {songs.map((song,index) => (
            <div key={song.id} className="song-item">
              <img src={(process.env.PUBLIC_URL + coverPath + song.cover) || logo} alt="Album Cover" className="album-cover"/>
              <div className="song-details">
                <p className="song-title">{song.title}</p>
                <p className="song-album">{song.album}</p>
              </div>
              <div className="song-actions">
                <AudioPlayer
                    key={song.id}
                    src={process.env.PUBLIC_URL + songPath + song.filePath}
                    onPlay={() => handlePlay(index)}
                    ref={(el) => (audioRefs.current[index] = el)}
                />
              {/*  {*/}
              {/*    <audio ref={audioRef} src={songPath + song.filePath} onPause={handlePause}></audio>*/}
              {/*    //<audio ref={audioRef} src={songPath + song.filePath}/>*/}
              {/*}*/}
              {/*{*/}
              {/*    <button className="play-button" onClick={togglePlayPause}>*/}
              {/*      {isPlaying ? 'Pause' : 'Play'}*/}
              {/*      <img src={playIcon} alt="Play"/>*/}
              {/*    </button>*/}
              {/*  }*/}
              {/*  {*/}
              {/*    <button className="play-button" onClick={() => handlePause()}>*/}
              {/*      <img src={playIcon} alt="Pause"/>*/}
              {/*    </button>*/}
              {/*  }*/}
                <button className="delete-button" onClick={() => handleDeleteClick(song.id)}>
                  <img src={deleteIcon} alt="Delete"/>
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
