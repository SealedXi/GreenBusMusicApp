// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './SongLists.css'; // Import the CSS file
// import logo from '../assets/logo.png'; // Album logo or cover art
// //import playIcon from '../assets/play.png'; // Placeholder play icon
// import deleteIcon from '../assets/delete.png'; // Placeholder delete icon
// import axios from 'axios';

// import AudioPlayer from './AudioPlayer';

// const SongLists = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userId } = location.state || {}; // Retrieve userId from location state
//   const [songs, setSongs] = useState([]);
//   const songPath = '/uploads/song/';
//   const coverPath = '/uploads/cover/';

//   const audioRefs = useRef([]);
//   //const [isPlaying, setIsPlaying] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
//   const [selectedSort, setSelectedSort] = useState(''); // State for selected sort option

//   const fetchSongs = async (params) => {
//     const { order, keyword } = params;
//     if (!userId) {
//       console.error('No userId provided');
//       navigate('/login');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('userId', userId);
//       formData.append('order', order);
//       formData.append('keyword', keyword);

//       const response = await axios.post('/api/songs/list', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//       });

//       setSongs(response.data);
//     } catch (error) {
//       console.error('Failed to fetch songs', error);
//     }
//   };

//   useEffect(() => {
//     fetchSongs({ order: selectedSort, keyword: '' });
//   }, [userId]);

//   const handlePlay = (index) => {
//     audioRefs.current.forEach((audio, i) => {
//       if (i !== index && audio) {
//         audio.pause();
//       }
//     });
//   };

//   const handleBackClick = () => {
//     navigate('/profile');
//   };

//   const handleDeleteClick = async (songId) => {
//     try {
//       await axios.delete(`/api/songs/${songId}`);
//       setSongs(songs.filter(song => song.id !== songId));
//       console.log(`Deleted song with id: ${songId}`);
//     } catch (error) {
//       console.error('Failed to delete song', error);
//     }
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleSortSelect = (sortOption) => {
//     setSelectedSort(sortOption);
//     setShowDropdown(false);
//     // Add logic here to sort the songs when the backend functionality is implemented
//     fetchSongs({ order: sortOption, keyword: '' });
//   };

//   return (
//     <div className="song-lists-page">
//       <header className="header-banner">
//         <h1>Green Bus Music App</h1>
//         <div className="sort-container">
//           <button className="sort-button" onClick={toggleDropdown}>
//             Sort by {selectedSort && `: ${selectedSort}`}
//           </button>
//           {showDropdown && (
//             <ul className="sort-dropdown">
//               {
//                 //@param order 1 - id, 2 - title, 3 - album, 4 - artist, 5 - genre, 6 - upload_date
//               }
//               <li onClick={() => handleSortSelect('id')}>ID</li>
//               <li onClick={() => handleSortSelect('title')}>Title</li>
//               <li onClick={() => handleSortSelect('album')}>Album</li>
//               <li onClick={() => handleSortSelect('artist')}>Artist</li>
//               <li onClick={() => handleSortSelect('genre')}>Genre</li>
//               <li onClick={() => handleSortSelect('upload_date')}>Upload Date</li>
//             </ul>
//           )}
//         </div>
//       </header>
//       <div className="songs-section">
//         <h2>Your Songs</h2>
//         {songs.map((song, index) => (
//           <div key={song.id} className="song-item">
//             <img src={(process.env.PUBLIC_URL + coverPath + song.cover) || logo} alt="Album Cover" className="album-cover" />
//             <div className="song-details">
//               <p className="song-title">{song.title}</p>
//               <p className="song-album">{song.album}</p>
//             </div>
//             <div className="song-actions">
//               <AudioPlayer
//                 key={song.id}
//                 src={process.env.PUBLIC_URL + songPath + song.filePath}
//                 onPlay={() => handlePlay(index)}
//                 ref={(el) => (audioRefs.current[index] = el)}
//               />
//               <button className="delete-button" onClick={() => handleDeleteClick(song.id)}>
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

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SongLists.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Album logo or cover art
import playIcon from '../assets/play.png'; // Placeholder play icon
import deleteIcon from '../assets/delete.png'; // Placeholder delete icon
import shareIcon from '../assets/share.png'; // Placeholder share icon
import axios from 'axios';

import AudioPlayer from './AudioPlayer';

const SongLists = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve userId from location state
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const songPath = '/uploads/song/';
  const coverPath = '/uploads/cover/';

  const audioRefs = useRef([]);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedSort, setSelectedSort] = useState(''); // State for selected sort option

  const fetchSongs = async (params) => {
    const { order, keyword } = params;
    if (!userId) {
      console.error('No userId provided');
      navigate('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('order', order);
      formData.append('keyword', keyword);

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

  useEffect(() => {
    fetchSongs({ order: selectedSort, keyword: '' });
  }, [userId]);

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
//share song
  const handleShareClick = (song) => {
    const shareData = {
      title: song.title,
      text: `Check out this song: ${song.title} by ${song.artist}`,
      url: window.location.origin + songPath + song.filePath
    };

    try {
      navigator.share(shareData)
        .then(() => console.log('Song shared successfully'))
        .catch((error) => console.error('Error sharing song', error));
    } catch (error) {
      console.error('Share API not supported', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    setShowDropdown(false);
    fetchSongs({ order: sortOption, keyword: '' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchSongs({ order: selectedSort, keyword: event.target.value });
  };

  return (
    <div className="song-lists-page">
      <header className="header-banner">
        <h1>Green Bus Music App</h1>
        <div className="sort-container">
          <button className="sort-button" onClick={toggleDropdown}>
            Sort by {selectedSort && `: ${selectedSort}`}
          </button>
          {showDropdown && (
            <ul className="sort-dropdown">
              {
                //@param order 1 - id, 2 - title, 3 - album, 4 - artist, 5 - genre, 6 - upload_date
              }
              <li onClick={() => handleSortSelect('id')}>ID</li>
              <li onClick={() => handleSortSelect('title')}>Title</li>
              <li onClick={() => handleSortSelect('album')}>Album</li>
              <li onClick={() => handleSortSelect('artist')}>Artist</li>
              <li onClick={() => handleSortSelect('genre')}>Genre</li>
              <li onClick={() => handleSortSelect('upload_date')}>Upload Date</li>
            </ul>
          )}
        </div>
      </header>
      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Search for songs..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-bar"
        />
      </div>
      <div className="songs-section">
        <h2>Your Songs</h2>
        {songs.map((song, index) => (
          <div key={song.id} className="song-item">
            <img src={(process.env.PUBLIC_URL + coverPath + song.cover) || logo} alt="Album Cover" className="album-cover" />
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
              <button className="share-button" onClick={() => handleShareClick(song)}>
                <img src={shareIcon} alt="Share" />
              </button>
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