import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LoggedUserPlaylists.module.scss"
import playlistsManager from "../../../models/PlaylistsManager";

const LoggedUserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  const userPlaylists = allPlaylists.filter(playlist => playlist.username === loggedUser?.username);
  const [showMore, setShowMore] = useState(userPlaylists.length > 3);

  useEffect(() => {
    if (userPlaylists.length) {
      setPlaylists(userPlaylists.slice(0, 3));
    }
  }, []);

  const handleShowMore = () => {
    const newLength = playlists.length + 3;
    const newList = userPlaylists.slice(0, newLength)
    setPlaylists(newList);
    if (newList.length >= userPlaylists.length)
      setShowMore(false);
  };

  const handlePlaylistDeletion = (username, playlistID) => {
    playlistsManager.deletePlaylist(username, playlistID);
    const allCurrentPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
    const userCurrentPlaylists = allCurrentPlaylists.filter(playlist => playlist.username === loggedUser?.username);
    console.log(userCurrentPlaylists);

    setPlaylists(userCurrentPlaylists);
  }


  if (playlists.length === 0) {
    if (userPlaylists.length === 0) {
      return (
        <div>
          <h2>Playlists</h2>
          <span>No playlists yet</span>
        </div>
      )
    }
    setPlaylists(userPlaylists.slice(0, 3));
  }

  return (
    <div >
      <h2>Playlists</h2>
      <div className={styles.cardContainer}>
        {playlists.map((playlist) => (
          <div key={playlist.playlistID}>
            <h4>Playlist image</h4>
            <h5>{playlist.playlistName}</h5>
            <p>{playlist.videos.length} Videos</p>
            {loggedUser ? <Link to={`/editPlaylistPage/${playlist.playlistID}`}><button >Edit playlist</button></Link>
              : <Link to="/login">Login</Link>
            }
            <button onClick={() => handlePlaylistDeletion(playlist.username, playlist.playlistID)} >Delete playlist</button>

          </div>
        ))}
      </div>
      {showMore && (
        <button onClick={handleShowMore}>
          Show more
        </button>
      )}

    </div>
  );
};

export default LoggedUserPlaylists;
