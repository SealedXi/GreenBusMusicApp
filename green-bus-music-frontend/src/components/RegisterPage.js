// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './RegisterPage.css'; // Create this file for custom styling
// import logo from '../assets/logo.png';

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="register-page">
//       <img src={logo} alt="Green Bus Records Logo" className="logo" />
//       <h1>GREEN BUS RECORDS™</h1>
//       <p>Please input your information to register a new account:</p>
//       <form className="register-form">
//         <label>Username:</label>
//         <input type="text" name="username" required />
//         <label>Email:</label>
//         <input type="email" name="email" required />
//         <label>Password:</label>
//         <input type="password" name="password" required />
//         <div className="button-container">
//           <button type="submit" className="register-button">REGISTER</button>
//           <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Create this file for custom styling
import logo from '../assets/logo.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackClick = () => {
    navigate('/login');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (username === 'John' && email === 'abc@abc.com' && password === '1234') {
      navigate('/profile', { state: { username, email } });
    } else {
      alert('Registration details are incorrect.');
    }
  };

  return (
    <div className="register-page">
      <img src={logo} alt="Green Bus Records Logo" className="logo" />
      <h1>GREEN BUS RECORDS™</h1>
      <p>Please input your information to register a new account:</p>
      <form className="register-form" onSubmit={handleRegisterSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="register-button">REGISTER</button>
          <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
