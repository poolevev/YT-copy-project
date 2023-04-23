import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  defaultThumbnailUrl,
  defaultVideoUrl,
  defaultVideoTitle,
  defaultChannelUrl,
  defaultChannelTitle,
} from "../../utils/defaultVideo";
import ReactPlayer from "react-player";
import { makeAPICall } from "../../utils/makeAPICall";
import styles from "./VideoCard.module.scss";
import { BiTime } from "react-icons/bi"

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

  // to many request,
  // useEffect(() => {
  //   makeAPICall(`channels?part=snippet&id=${snippet.channelId}`).then(
  //     (data) => {
  //       setLogoLink(data?.items[0].snippet.thumbnails.default.url);
  //     }
  //   );
  // },[]);

  function getTimeDifference(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return `${diffHours} hour${getSuffix(diffHours)}`;
    } else if (diffDays < 7) {
      return `${diffDays} day${getSuffix(diffDays)}`;
    } else if (diffDays < 365) {
      const diffMonths = Math.ceil(diffDays / 30);
      return `${diffMonths} month${getSuffix(diffMonths)}`;
    } else {
      const diffYears = Math.ceil(diffDays / 365);
      return `${diffYears} year${getSuffix(diffYears)}`;
    }
  }

  function getSuffix(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return "";
    } else if (
      [2, 3, 4].includes(number % 10) &&
      ![12, 13, 14].includes(number % 100)
    ) {
      return "s";
    } else {
      return "s";
    }
  }


  if (renderPlayer) {
    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        // width="150px"
        // height="300px"
        width="200px"
        height="400px"
        controls={false}
        className={styles.reactPlayer}
        onPause={() => {
          isShortsPage && setRenderPlayer(false);
        }}
        //the size may be set using  state
        muted={true}
        playing={true}
        id="short-player"
      />
    );
  } else {
    return (
      <div
        className={isShortsPage ? styles.shortcard : styles.cardVideo}
        onClick={() => {
          isShortsPage && setRenderPlayer(true);
        }}
      >
        <Link
          to={videoId ? `/video/${videoId}` : `/video/PVc1yFV0p40`}
          onClick={(e) => isShortsPage && e.preventDefault()}
        >
          <img
            src={snippet?.thumbnails?.high?.url || defaultThumbnailUrl}
            alt={snippet?.title}
            className={styles.cardMedia}
            style={{ objectFit: "cover" }}
          />
        </Link>
        <div className={styles.cardContent}>
          <div className={styles.cardLogo}>
            <Link
              to={
                snippet?.channelId
                  ? `/channel/${snippet?.channelId}`
                  : defaultChannelUrl
              }
              className={styles.channelLogoLink}
            >
              <img
                className={styles.channelLogo}
                src={snippet?.thumbnails.default.url || defaultThumbnailUrl}
                alt={"Logo"}
              />
            </Link>
          </div>
          <div className={styles.cardText}>
            <Link to={videoId ? `/video/${videoId}` : defaultVideoUrl}>
              <div className={styles.cardTitle}>
                {`${snippet?.title.slice(0, 60)}...` ||
                  defaultVideoTitle.slice(0, 60)}
              </div>
            </Link>
            <Link
              to={
                snippet?.channelId
                  ? `/channel/${snippet?.channelId}`
                  : defaultChannelUrl
              }
              className={styles.channelLink}
            >
              <div className={styles.channelTitle}>
                {snippet?.channelTitle || defaultChannelTitle}
              </div>
            </Link>
            <span className={styles.addedAgo}><BiTime /> {getTimeDifference(dateString)} ago</span>

          </div>
        </div>
      </div>
    );
  }
};

export default VideoCard;
