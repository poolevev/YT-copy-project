import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styles from "./EditPlaylistPage.module.scss";
import { makeAPICall } from "../../utils/makeAPICall";
import VideoCard from "../homePage/VideoCard";
import playlistsManager from '../../models/PlaylistsManager';

const EditPlaylistPage = () => {
  const { playlistID } = useParams();
  const allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
  const currentPlaylist = allPlaylists.find(playlist => playlist.playlistID === playlistID);
  const [videos, setVideos] = useState([]);

  const handleVideoRemove = (videoID) => {

    playlistsManager.removeVideoFromPlaylist(playlistID, videoID);
    const newAllPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
    const newCurrentPlaylist = newAllPlaylists.find(playlist => playlist.playlistID === playlistID);
    setVideos([]);
    newCurrentPlaylist?.videos.map(videoID => {
      makeAPICall(`videos?part=snippet&id=${videoID}`).then((data) =>
        setVideos([...videos, data.items[0]])
      )
    })
  }

  useEffect(() => {
    currentPlaylist?.videos.map(videoID => {
      makeAPICall(`videos?part=snippet&id=${videoID}`).then((data) =>
        setVideos([...videos, data.items[0]])
      )
    })
  }, []);

  if (videos.length === 0) {
    return (
      <div>
        <h2>Playlist {currentPlaylist.playlistName}</h2>
        <h4>Empty playlist</h4>
      </div>
    )
  }

  return (
    <div >
      <h2>Playlist {currentPlaylist.playlistName}</h2>
      <div className={styles.cardContainer}>
        {videos?.map(item => (
          <div key={item.id}>
            <VideoCard video={item} />
            <button onClick={() => handleVideoRemove(item.id)} >Remove video</button>
          </div>
        ))}
      </div>
      {console.log(videos)}
    </div>
  );
}

export default EditPlaylistPage;