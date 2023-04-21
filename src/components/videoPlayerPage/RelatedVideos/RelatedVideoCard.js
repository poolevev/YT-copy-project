import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  defaultThumbnailUrl,
  defaultVideoUrl,
  defaultVideoTitle,
  defaultChannelUrl,
  defaultChannelTitle,
} from "../../../utils/defaultVideo";

import styles from "./RelatedVideoCard.module.scss";

const RelatedVideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const isShortsPage = window.location.pathname === "/shorts";
  //const [logoLink, setLogoLink] = useState(null);

  // to many request,
  // useEffect(() => {
  //   makeAPICall(`channels?part=snippet&id=${snippet.channelId}`).then(
  //     (data) => {
  //       setLogoLink(data?.items[0].snippet.thumbnails.default.url);
  //     }
  //   );
  // },[]);

  return (
    <div className={isShortsPage ? styles.shortcard : styles.card}>
      <Link to={videoId ? `/video/${videoId}` : `/video/PVc1yFV0p40`}>
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
            <img className={styles.channelLogo} src={snippet?.thumbnails.default.url || defaultThumbnailUrl} alt={"Logo"} />
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
        </div>
      </div>
    </div>
  );
};

export default RelatedVideoCard;
