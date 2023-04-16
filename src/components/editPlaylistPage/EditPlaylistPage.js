import React from 'react'
import { useParams } from "react-router-dom";

const EditPlaylistPage = () => {
  const { playlistID } = useParams();
  return (
    <div>Playlist {playlistID}</div>
  )
}

export default EditPlaylistPage;