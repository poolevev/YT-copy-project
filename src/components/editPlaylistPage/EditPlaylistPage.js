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

  console.log(currentPlaylist?.videos)
  useEffect(() => {
    currentPlaylist?.videos.forEach(videoID => {
      makeAPICall(`videos?part=snippet&id=${videoID}`).then((data) => {
        setVideos(prevVideos => [...prevVideos, data.items[0]])
      })
    })
  }, []);


  const handleVideoRemove = (videoID) => {

    playlistsManager.removeVideoFromPlaylist(playlistID, videoID);
    const newVideos = videos.filter(video => video.id !== videoID);
    setVideos(newVideos);
  }


  if (videos?.length === 0) {
    return (
      <div>
        <h2 className={styles.playlistTitle}>Playlist {currentPlaylist.playlistName}</h2>
        <hr></hr>
        <h4 className={styles.emptyPlaylistText}>Empty playlist</h4>
      </div>
    )
  }

  return (
    <div >
      <h2>Playlist {currentPlaylist.playlistName}</h2>
      <hr></hr>
      <div className={styles.cardContainer}>
        {videos?.map(item => (
          <div key={item?.id}>
            <VideoCard video={item} />
            <button className={styles.removeFromPlaylistBtn} onClick={() => handleVideoRemove(item?.id)} >Remove from playlist</button>
          </div>
        ))}
      </div>
      {console.log(videos)}
    </div>
  );
}

export default EditPlaylistPage;