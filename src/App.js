import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/navBar/Navigation';
import Home from './components/homePage/Home';
import VideoPlayerPage from './components/videoPlayerPage/VideoPlayerPage';
import LibraryPage from './components/libraryPage/LibraryPage';
import PlaylistsPage from './components/playlistsPage/PlaylistsPage';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registration/RegisterPage';
import Sidebar from "./components/sideBar/Sidebar"

function App() {
  return (

    <Box>
      <Navigation />
      <Sidebar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/video/:id' element={<VideoPlayerPage />} />
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
