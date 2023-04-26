import React from "react";
import { Link } from "react-router-dom";
import { defaultThumbnailUrl, defaultVideoUrl, defaultVideoTitle, defaultChannelUrl, defaultChannelTitle } from "../../utils/defaultVideo";
import styles from "./LibraryVideoCard.module.scss";
import { getTimeDifference } from "../../utils/getTimeDifference";
import { BiHistory } from "react-icons/bi";
const LibraryVideoCard = ({ video: { videoID, snippet, viewedAt }, category }) => {
  const formattedDate = getTimeDifference(viewedAt);

  return (
    <div className={styles.card}>
      {category !== "Liked" ?
        <span style={{ marginLeft: "10 px" }}>
          {" "}
          <BiHistory />{formattedDate} ago
        </span> : null}
      <Link to={videoID ? `/video/${videoID}` : `/video/PVc1yFV0p40`}>
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
          <Link to={videoID ? `/video/${videoID}` : defaultVideoUrl}>
            <div className={styles.cardTitle}>{`${snippet?.title.slice(0, 60)}...` || defaultVideoTitle.slice(0, 60)}</div>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLink}>
            <div className={styles.channelTitle}>{snippet?.channelTitle || defaultChannelTitle}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibraryVideoCard;
