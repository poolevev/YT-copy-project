import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoggedUserPlaylists.module.scss"
import playlistsManager from "../../../models/PlaylistsManager";

const LoggedUserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  let userPlaylists = allPlaylists.filter(playlist => playlist.username === loggedUser?.username);

  const handleShowMore = () => {
    const numPlaylistsToShow = playlists.length + 3;
    if (numPlaylistsToShow <= userPlaylists.length) {
      setShowMore(true);
    }
    setPlaylists(userPlaylists.slice(0, numPlaylistsToShow));
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
