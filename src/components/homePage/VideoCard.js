import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { defaultThumbnailUrl, defaultVideoUrl, defaultVideoTitle, defaultChannelUrl, defaultChannelTitle } from '../../utils/defaultVideo';
import styles from './VideoCard.module.scss';
import { makeAPICall } from '../../utils/makeAPICall';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  const isShortsPage = window.location.pathname === '/shorts';
  const [logoLink, setLogoLink] = useState(null)

  useEffect(() => {
    makeAPICall(`channels?part=snippet&id=${snippet.channelId}`).then(
      (data) => {
        setLogoLink(data?.items[0].snippet.thumbnails.default.url)
      }
    );
  })


  return (
    <div className={styles.container}>
      <div className={isShortsPage ? styles.shortcard : styles.card}>
        <Link to={videoId ? `/video/${videoId}` : `/video/PVc1yFV0p40`}>

          <img
            src={snippet?.thumbnails?.high?.url || defaultThumbnailUrl}
            alt={snippet?.title}
            className={styles.cardMedia}
            style={{ objectFit: 'cover' }}
          />
        </Link>
        <div className={styles.cardContent}>
          <div className={styles.cardLogo}>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLogoLink}>
              <img className={styles.channelLogo} src={logoLink} alt={"Logo"} />
            </Link>
          </div>
          <div className={styles.cardText}>
            <Link to={videoId ? `/video/${videoId}` : defaultVideoUrl}>
              <span className={styles.cardTitle}>
                {`${snippet?.title.slice(0, 80)}...` || defaultVideoTitle.slice(0, 60)}
              </span>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLink}>
              <span className={styles.channelTitle}>
                {snippet?.channelTitle || defaultChannelTitle}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
