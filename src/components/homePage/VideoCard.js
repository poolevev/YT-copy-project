import React from 'react';
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { defaultThumbnailUrl, defaultVideoUrl, defaultVideoTitle, defaultChannelUrl, defaultChannelTitle } from '../../utils/defaultVideo';
import styles from './VideoCard.module.scss';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <div className={styles.card}>
    <Link to={videoId ? `/video/${videoId}` : `/video/trttj`}>
      <img
        src={snippet?.thumbnails?.high?.url || defaultThumbnailUrl}
        alt={snippet?.title}
        className={styles.cardMedia}
      />
    </Link>
    <div className={styles.cardContent}>
      <Link to={videoId ? `/video/${videoId}` : defaultVideoUrl}>
        <span variant="subtitle1" fontWeight="bold" className={styles.cardTitle}>
          {snippet?.title.slice(0, 60) || defaultVideoTitle.slice(0, 60)}
        </span>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLink}>
        <span variant="subtitle2" className={styles.channelTitle}>
          {snippet?.channelTitle || defaultChannelTitle}
          <CheckCircleIcon className={styles.checkCircleIcon} />
        </span>
      </Link>
    </div>
  </div>
);

export default VideoCard;
