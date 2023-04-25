import React from "react";
import History from "./history/History";
import LoggedUserPlaylists from "./playlists/LoggedUserPlaylists";
import LikedVideos from "./Liked/LikedVideos";
import styles from "./LibraryPage.module.scss";

const LibraryPage = () => {
  return (
    <div className={styles.libraryContainer}>
      <History />
      <LoggedUserPlaylists />
      <LikedVideos />
    </div>
  );
};

export default LibraryPage;
