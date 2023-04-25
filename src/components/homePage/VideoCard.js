import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { defaultThumbnailUrl, defaultVideoUrl, defaultVideoTitle, defaultChannelUrl, defaultChannelTitle } from "../../utils/defaultVideo";
import ReactPlayer from "react-player";
//import { makeAPICall } from "../../utils/makeAPICall";
import styles from "./VideoCard.module.scss";
import { BiTime } from "react-icons/bi";
import { getTimeDifference } from "../../utils/getTimeDifference";

import Loader from "../videoPlayerPage/Loader"

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const isShortsPage = window.location.pathname === "/shorts";
  //const [logoLink, setLogoLink] = useState(null);
  const dateString = snippet.publishedAt;
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // to many request,
  // useEffect(() => {
  //   makeAPICall(`channels?part=snippet&id=${snippet.channelId}`).then(
  //     (data) => {
  //       setLogoLink(data?.items[0].snippet.thumbnails.default.url);
  //     }
  //   );
  // },[]);

  if (renderPlayer) {
    return (
      <div className={styles.videoContainer}>
        <ReactPlayer
  url={`https://www.youtube.com/watch?v=${videoId}`}
  width="300px"
  height="600px"
  controls={true}
  className={styles.reactPlayer}
  onPause={() => {
    isShortsPage && setRenderPlayer(false);
  }}
  muted={true}
  playing={true}
  id="short-player"
  onPlay={() => setIsPlaying(true)}
/>
{!isPlaying && (
  <div className={styles.loaderContainer}>
    <Loader className={styles.loaderShorts} />
  </div>
)}
      </div>
    );
  } else {
    return (
      <div
        className={isShortsPage ? styles.shortcard : styles.cardVideo}
        onClick={() => {
          isShortsPage && setRenderPlayer(true);
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : `/video/PVc1yFV0p40`} onClick={(e) => isShortsPage && e.preventDefault()}>
          <img
            src={snippet?.thumbnails?.high?.url || defaultThumbnailUrl}
            alt={snippet?.title}
            className={styles.cardMedia}
            style={{ objectFit: "cover" }}
          />
        </Link>
        <div className={styles.cardContent}>
          <div className={styles.cardLogo}>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLogoLink}>
              <img className={styles.channelLogo} src={snippet?.thumbnails.default.url || defaultThumbnailUrl} alt={"Logo"} />
            </Link>
          </div>
          <div className={styles.cardText}>
            <Link to={videoId ? `/video/${videoId}` : defaultVideoUrl}>
              <div className={styles.cardTitle}>{`${snippet?.title.slice(0, 60)}...` || defaultVideoTitle.slice(0, 60)}</div>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLink}>
              <div className={styles.channelTitle}>{snippet?.channelTitle || defaultChannelTitle}</div>
            </Link>
            <span className={styles.addedAgo}>
              <BiTime /> {getTimeDifference(dateString)} ago
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default VideoCard;
