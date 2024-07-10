// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SongLists.css'; // Import the CSS file
// import playIcon from '../assets/play.png'; // Placeholder play icon
// import deleteIcon from '../assets/delete.png'; // Placeholder delete icon

// const SongLists = () => {
//   const navigate = useNavigate();
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
//     setSongs(savedSongs);
//   }, []);

//   const handleBackClick = () => {
//     navigate('/profile');
//   };

//   const handlePlayClick = (songUrl) => {
//     const audio = new Audio(songUrl);
//     audio.play();
//   };

//   const handleDeleteClick = (index) => {
//     const updatedSongs = songs.filter((_, i) => i !== index);
//     setSongs(updatedSongs);
//     localStorage.setItem('songs', JSON.stringify(updatedSongs));
//   };

//   return (
//     <div className="song-lists-page">
//       <header className="header-banner">
//         <h1>Green Bus Music App</h1>
//         <button className="sort-button">SORT</button>
//       </header>
//       <div className="songs-section">
//         <h2>Your Songs</h2>
//         {songs.map((song, index) => (
//           <div className="song-item" key={index}>
//             <img src={song.coverArtUrl} alt="Album Cover" className="album-cover" />
//             <div className="song-details">
//               <p className="song-title">{song.title}</p>
//               <p className="song-album">{song.album}</p>
//             </div>
//             <div className="song-actions">
//               <button className="play-button" onClick={() => handlePlayClick(song.songUrl)}>
//                 <img src={playIcon} alt="Play" />
//               </button>
//               <button className="delete-button" onClick={() => handleDeleteClick(index)}>
//                 <img src={deleteIcon} alt="Delete" />
//               </button>
//             </div>
//           </div>
//         ))}
//         <button className="back-button" onClick={handleBackClick}>Back</button>
//       </div>
//     </div>
//   );
// };

// export default SongLists;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SongLists.css'; // Import the CSS file
import playIcon from '../assets/play.png'; // Placeholder play icon
import stopIcon from '../assets/stop.png'; // Placeholder stop icon
import deleteIcon from '../assets/delete.png'; // Placeholder delete icon

const SongLists = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(savedSongs);
  }, []);

  const handleBackClick = () => {
    navigate('/profile');
  };

  const handlePlayClick = (songUrl) => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    const audio = new Audio(songUrl);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleStopClick = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  const handleDeleteClick = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
  };

  return (
    <div className="song-lists-page">
      <header className="header-banner">
        <h1>Green Bus Music App</h1>
        <button className="sort-button">SORT</button>
      </header>
      <div className="songs-section">
        <h2>Your Songs</h2>
        {songs.map((song, index) => (
          <div className="song-item" key={index}>
            <img src={song.coverArtUrl} alt="Album Cover" className="album-cover" />
            <div className="song-details">
              <p className="song-title">{song.title}</p>
              <p className="song-album">{song.album}</p>
            </div>
            <div className="song-actions">
              <button className="play-button" onClick={() => handlePlayClick(song.songUrl)}>
                <img src={playIcon} alt="Play" />
              </button>
              <button className="stop-button" onClick={handleStopClick}>
                <img src={stopIcon} alt="Stop" />
              </button>
              <button className="delete-button" onClick={() => handleDeleteClick(index)}>
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
