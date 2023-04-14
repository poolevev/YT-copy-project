import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "./Loader"
import Videos from "../homePage/Videos";
import { makeAPICall } from "../../utils/makeAPICall";
import historyManager from "../../models/HistoryManager";

import styles from "./VideoPlayerPage.module.scss";

const VideoPlayerPage = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const alreadyViewedVideo = historyManager.allHistory.find(videoHistory => videoHistory.videoID === id && videoHistory.username === loggedUser.username)
  const [likesVideoSnippet, setLikesVideoSnippet] = useState(null);
  const [isLikeClicked, setIsLikeClicked] = useState(alreadyViewedVideo?.isLiked === true ? true : false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(alreadyViewedVideo?.isLiked === false ? true : false);
  let videoSnippet = null;


  function addToHistory() {
    historyManager.createHistoryItem(id, loggedUser, videoSnippet, alreadyViewedVideo?.isLiked);
  }

  function likeVideo() {

    if (isLikeClicked) {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, null);
      console.log("not Liked");
    } else {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, true);
      console.log("Liked");
    }

    setIsLikeClicked(!isLikeClicked);
    setIsDislikeClicked(false);

  }
  function dislikeVideo() {

    if (isDislikeClicked) {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, null);
      console.log("not disLiked");
    } else {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, false);
      console.log("disLiked")
    }

    setIsDislikeClicked(!isDislikeClicked);
    setIsLikeClicked(false)

  }


  useEffect(() => {
    makeAPICall(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
      videoSnippet = data.items[0].snippet
      setLikesVideoSnippet(videoSnippet);
      addToHistory();
    }
    );

    makeAPICall(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideos(data.items);

      }
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
  } = videoDetail;
  // will be taken from local storage
  const viewCount = null;
  const likeCount = null;

  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className={styles.reactPlayer}
          controls

        />
        <h5 className={styles.title} >{title}</h5>
        <div className={styles.info}>
          <Link to={`/channel/${channelId}`}>
            <h6 className={styles.channelTitle}>{channelTitle}</h6>
          </Link>
          <div className={styles.stats}>
            <span className={styles.viewCount}>
              {parseInt(viewCount).toLocaleString()} views
            </span>
            <span className={styles.likeCount}>
              {parseInt(likeCount).toLocaleString()} likes
            </span>
          </div>
          <button className={`${styles.button} ${isLikeClicked ? styles.clicked : styles.notClicked}`} onClick={likeVideo}>&#x1F44D;</button>
          <button className={`${styles.button} ${isDislikeClicked ? styles.clicked : styles.notClicked}`} onClick={dislikeVideo}>&#x1F44E;</button>
        </div>
      </div>
      <div className={styles.relatedVideos}>
        <Videos videos={videos} direction="column" />
      </div>
    </div>
  );
};

export default VideoPlayerPage;
