import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navBar/Navigation';
import Home from './components/homePage/Home';
import VideoPlayerPage from './components/videoPlayerPage/VideoPlayerPage';
import SearchedVideos from './components/homePage/searchedVideos/SearchedVideos'
import LibraryPage from './components/libraryPage/LibraryPage';
import PlaylistsPage from './components/playlistsPage/PlaylistsPage';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registration/RegisterPage';
import Sidebar from "./components/sideBar/Sidebar";

function App() {
  return (

    <div>
      <Navigation />
      <Sidebar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/video/:id' element={<VideoPlayerPage />} />
        <Route path='/search/:searchedVideos' element={<SearchedVideos />} />
        <Route path='/library' element={<LibraryPage />} />
        <Route path='/playlists' element={<PlaylistsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </div>

  );
}

export default App;
