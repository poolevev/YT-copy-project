import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeAPICall } from "../../../utils/makeAPICall";
import Videos from "../Videos";
import styles from "./SearchedVideos.module.scss";

const SearchVideos= () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    makeAPICall(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </h4>
      <div className={styles.content}>
        <div className={styles.spacing}/>
        {<Videos videos={videos} />}
      </div>
    </div>
  );
};

export default SearchVideos;
