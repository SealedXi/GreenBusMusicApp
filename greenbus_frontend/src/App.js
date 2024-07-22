import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MenuPage from './components/MenuPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './components/UserProfile';
import UploadSongs from './components/UploadSongs';
import SongLists from './components/SongLists'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload-songs" element={<UploadSongs />} />
          <Route path="/view-songs" element={<SongLists />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
