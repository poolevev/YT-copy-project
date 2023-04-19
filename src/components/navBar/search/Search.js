import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [searchedVideos, setSearchedVideo] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      navigate(`/search/${searchedVideos}`);
    }
  };

  const onhandleClear = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      setSearchedVideo("")
    }
  };

  return (
    <form className={styles.form} onSubmit={onhandleSubmit}>
      <input
        className={styles.input}
        placeholder="Search..."
        value={searchedVideos}
        onChange={(e) => setSearchedVideo(e.target.value)}
      />
      <button onClick={onhandleClear} className={styles.button} aria-label="search">
        Clear
      </button>
      <button className={styles.button} type="submit" aria-label="search">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
