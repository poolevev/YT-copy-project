import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "./Loader"
import Videos from "../homePage/Videos";
import { makeAPICall } from "../../utils/makeAPICall";

import styles from "./VideoPlayerPage.module.scss";

const VideoPlayerPage = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    makeAPICall(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    makeAPICall(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
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
        <h5 className={styles.title}>{title}</h5>
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
        </div>
      </div>
      <div className={styles.relatedVideos}>
        <Videos videos={videos} direction="column" />
      </div>
    </div>
  );
};

export default VideoPlayerPage;
