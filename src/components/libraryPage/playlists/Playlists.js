import React, { useState } from "react";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showMore, setShowMore] = useState(true);

  // Fetch playlists from local storage
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const allPlaylists = JSON.parse(localStorage.getItem("allPlaylists"));
  const userPlaylists = allPlaylists.filter(
    (playlist) => playlist.username === loggedUser.username
  );

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
      return <span>No playlists yet</span>;
    }
    setPlaylists(userPlaylists.slice(0, 3));
  }

  return (
    <div>
      <h2>Playlist</h2>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <p>{playlist.description}</p>
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


// This component uses the useState hook to manage the state of the playlists array, which initially contains the first three playlists for the logged-in user, fetched from local storage. It also manages the showMore state, which determines whether or not the "Show more" button should be displayed.

// The component fetches the loggedUser and allPlaylists objects from local storage and uses the filter method to create a new array containing only the playlists for the logged-in user. If there are no playlists, the component returns a span element with the text "No playlists yet".

// The handleShowMore function updates the playlists state to include three more playlists, or all remaining playlists if there are fewer than three remaining. If there are no more playlists to show, it sets the showMore state to false.

// The return statement includes the h2 element with the title "Playlist", and a map of the playlists array to render each playlist as a div element containing the playlist name and description. If the showMore state is true, a "Show more" button is also included, which triggers the handleShowMore function when clicked.