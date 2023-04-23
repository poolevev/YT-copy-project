import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navBar/Navigation';
import Home from './components/homePage/Home';
import VideoPlayerPage from './components/videoPlayerPage/VideoPlayerPage';
import SearchedVideos from './components/homePage/searchedVideos/SearchedVideos'
import LibraryPage from './components/libraryPage/LibraryPage';
import EditPlaylistPage from './components/editPlaylistPage/EditPlaylistPage';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registration/RegisterPage';
import Sidebar from './components/sideBar/Sidebar';
import Profile from './components/profile/Profile';
import ChannelPage from "./components/channelPage/ChannelPage"
import Shorts from './components/homePage/shorts/shorts';

import styles from './App.module.scss';



function App() {
  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.main}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/video/:id' element={<VideoPlayerPage />} />
            <Route path='/search/:searchedVideos' element={<SearchedVideos />} />
            <Route path='/library' element={<LibraryPage />} />
            <Route path='/editPlaylistPage/:playlistID' element={<EditPlaylistPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/channel/:id' element={<ChannelPage />} />
            <Route path='/shorts' element={<Shorts />} />
            <Route path='*' element={
              <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Page not found</h2>
                <img width="300px" src="https://s3.amazonaws.com/images.seroundtable.com/youtube-404-1409831247.png" alt="Page not found" />
              </div>
            } />


          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
