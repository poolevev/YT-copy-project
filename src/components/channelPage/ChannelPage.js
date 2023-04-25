import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import Videos from "../homePage/Videos";
import { makeAPICall } from "../../utils/makeAPICall";
import styles from "./ChannelPage.module.scss";

const ChannelPage = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const showResults = async () => {
      const data = await makeAPICall(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await makeAPICall(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    showResults();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChannelCard channelDetail={channelDetail} />
      </div>

      <Videos videos={videos} />
    </div>
  );
};

export default ChannelPage;
