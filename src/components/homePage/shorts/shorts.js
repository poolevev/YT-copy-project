import React, { useState, useEffect } from "react";
import Categories from "../Categories.js";
import Videos from "../Videos.js";
import { makeAPICall } from "../../../utils/makeAPICall.js";
import styles from "../shorts/shorts.module.scss";

const Shorts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    makeAPICall(`search?part=snippet&q=shorts}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <div className={styles.videoContainerShorts}>
      <Videos videos={videos} initialVideosNumber={30}/>
    </div>
  );
};

export default Shorts;
