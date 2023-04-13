import React from 'react';
import { Link } from 'react-router-dom';
import { defaultThumbnailUrl, defaultVideoUrl, defaultVideoTitle, defaultChannelUrl, defaultChannelTitle } from "../../../utils/defaultVideo"
import styles from './HistoryCard.module.scss';

const HistoryCard = ({ history: { videoID, snippet } }) => (
    <div className={styles.card}>

        <Link to={videoID ? `/video/${videoID}` : `/video/PVc1yFV0p40`}>
            <img
                src={snippet?.thumbnails?.high?.url || defaultThumbnailUrl}
                alt={snippet?.title}
                className={styles.cardMedia}
                style={{ objectFit: 'cover' }}
            />
        </Link>
        <div className={styles.cardContent}>
            <Link to={videoID ? `/video/${videoID}` : defaultVideoUrl}>
                <span className={styles.cardTitle}>
                    {snippet?.title.slice(0, 60) || defaultVideoTitle.slice(0, 60)}
                </span>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : defaultChannelUrl} className={styles.channelLink}>
                <span className={styles.channelTitle}>
                    {snippet?.channelTitle || defaultChannelTitle}
                </span>
            </Link>
        </div>
    </div>
);

export default HistoryCard;
