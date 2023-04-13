import React, { useState } from "react";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  const userPlaylists = allPlaylists.filter(playlist => playlist.username === loggedUser.username);

  // Handle "Show more" button click
  const handleShowMore = () => {
    const numPlaylistsToShow = playlists.length + 3;
    if (numPlaylistsToShow >= userPlaylists.length) {
      setShowMore(false);
    }
    setPlaylists(userPlaylists.slice(0, numPlaylistsToShow));
  };

  // Initial load of playlists
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
        <div key={playlist.id}>
          <p>Playlist</p>
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

export default Playlist;
