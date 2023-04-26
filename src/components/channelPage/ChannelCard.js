import React from "react";
import styles from "./ChannelCard.module.scss";

const ChannelCard = ({ channelDetail }) => (
  <div className={styles.channelCard}>
    <span>
      <img src={channelDetail?.snippet?.thumbnails?.high?.url} alt={channelDetail?.snippet?.title} className={styles.channelCardImage} />
    </span>
    <div className={styles.channelCardBody}>
      <h6 className={styles.channelCardTitle}>{channelDetail?.snippet?.title}</h6>
      {channelDetail?.statistics?.subscriberCount && (
        <p className={styles.channelCardText}>{parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString("en-US")} Subscribers</p>
      )}
    </div>
  </div>
);

export default ChannelCard;
