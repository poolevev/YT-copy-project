import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoggedUserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  const userPlaylists = allPlaylists.filter(playlist => playlist.username === loggedUser?.username);

  const handleShowMore = () => {
    const numPlaylistsToShow = playlists.length + 3;
    if (numPlaylistsToShow >= userPlaylists.length) {
      setShowMore(false);
    }
    setPlaylists(userPlaylists.slice(0, numPlaylistsToShow));
  };


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
    <div>
      <h2>Playlists</h2>
      {playlists.map((playlist) => (
        <div key={playlist.playlistID}>
          <h4>Playlist image</h4>
          <h5>{playlist.playlistName}</h5>
          <p>{playlist.videos.length} Videos</p>
          {loggedUser ? <Link to={`/editPlaylistPage/${playlist.playlistID}`}><button >Edit playlist</button></Link>
            : <Link to="/login">Login</Link>
          }
          <button >Delete playlist</button>

        </div>
      ))}
      {showMore && (
        <button onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
};

export default LoggedUserPlaylists;
