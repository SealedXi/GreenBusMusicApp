# Green Bus Records React Project

## Overview
This project is a simple React application for Green Bus Records, featuring user authentication, profile management, and song upload functionalities. The project uses React Router for navigation and includes custom CSS for styling.

## Project Structure
```
src/
|-- assets/
|   |-- logo.png
|   |-- logonew.png
|   |-- play.png
|   |-- delete.png
|
|-- components/
|   |-- LoginPage.js
|   |-- MenuPage.js
|   |-- RegisterPage.js
|   |-- SongLists.js
|   |-- UploadSongs.js
|   |-- UserProfile.js
|
|-- styles/
|   |-- LoginPage.css
|   |-- MenuPage.css
|   |-- RegisterPage.css
|   |-- SongLists.css
|   |-- UploadSongs.css
|   |-- UserProfile.css
|
|-- App.js
|-- index.js
|-- routes.js
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/green-bus-records.git
   ```
2. Navigate to the project directory:
   ```sh
   cd green-bus-records
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Start the development server:
   ```sh
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`.

## Components

### LoginPage
Allows users to sign in or navigate to the registration page.
- Handles login form submission and basic authentication.
- Redirects to the profile page on successful login.
- Default Login: algonquin@greenbus.com / password
  
### MenuPage
The landing page with a sign-in button.
- Redirects to the login page.

### RegisterPage
Allows users to register a new account.
- Handles form input for username, email, and password.
- Includes navigation back to the login page.

### UserProfile
Displays user profile information and provides options to view or upload songs.
- Includes a logout button to navigate back to the home page.

### SongLists
Displays a list of songs with options to play or delete each song.
- Includes navigation back to the profile page.

### UploadSongs
Allows users to upload new songs and cover art.
- Handles file selection and upload actions.
- Includes a cancel button to navigate back to the profile page.

## Styles
Each component has a corresponding CSS file in the `styles/` directory. Universal styles are included at the top of each CSS file to ensure consistent theming across the application.

## Navigation
The application uses React Router for navigation between different pages. Update the `routes.js` file to add or modify routes as needed.
