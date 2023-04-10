import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/navBar/Navigation';
import Home from './components/homePage/Home';
import VideoPage from './components/videoPlayerPage/VideoPage';
import LibraryPage from './components/libraryPage/LibraryPage';
import PlaylistsPage from './components/playlistsPage/PlaylistsPage';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registration/RegisterPage';

function App() {
  return (

    <Box>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/video/:id' element={<VideoPage />} />
        <Route path='/library' element={<LibraryPage />} />
        <Route path='/playlists' element={<PlaylistsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<box>Page not found</box>} />

      </Routes>
    </Box>

  );
}

export default App;
