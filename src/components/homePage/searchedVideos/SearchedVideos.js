import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeAPICall } from "../../../utils/makeAPICall";
import Videos from "../Videos";
import styles from "./SearchedVideos.module.scss";

const SearchedVideos = () => {
  const [videos, setVideos] = useState(null);
  const { searchedVideos } = useParams();

  useEffect(() => {
    makeAPICall(`search?part=snippet&q=${searchedVideos}`).then((data) => setVideos(data.items));
  }, [searchedVideos]);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        Results for <span style={{ color: "gray" }}>{searchedVideos}</span>
      </h4>
      <div className={styles.content}>{<Videos videos={videos} />}</div>
    </div>
  );
};

export default SearchedVideos;
