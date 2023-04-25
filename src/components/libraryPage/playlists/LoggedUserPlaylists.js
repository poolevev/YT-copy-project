import React, { useState, useEffect } from "react";
import styles from "./LoggedUserPlaylists.module.scss";

import PlaylistCard from "./PlaylistCard";

const LoggedUserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  const userPlaylists = allPlaylists.filter((playlist) => playlist.username === loggedUser?.username);
  const [showMore, setShowMore] = useState(userPlaylists.length > 3);

  useEffect(() => {
    if (userPlaylists.length) {
      setPlaylists(userPlaylists.slice(0, 3));
    }
  }, []);

  const handleShowMore = () => {
    const newLength = playlists.length + 3;
    const newList = userPlaylists.slice(0, newLength);
    setPlaylists(newList);
    if (newList.length >= userPlaylists.length) setShowMore(false);
  };

  if (playlists.length === 0) {
    if (userPlaylists.length === 0) {
      return (
        <div>
          <h5 style={{ margin: "0 20px 10px" }}>Playlists</h5>
          <span>No playlists yet</span>
          <hr></hr>
        </div>
      );
    }
    setPlaylists(userPlaylists.slice(0, 3));
  }

  return (
    <div className={styles.playlistsCategoryContainer}>
      <h5 className={styles.categoryTitle}>Playlists</h5>
      <div className={styles.cardContainer}>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.playlistID} playlist={playlist} setPlaylists={setPlaylists} />
        ))}
      </div>
      {showMore && (
        <button className={styles.showMoreBtn} onClick={handleShowMore}>
          Show more
        </button>
      )}
      <hr></hr>
    </div>
  );
};

export default LoggedUserPlaylists;
