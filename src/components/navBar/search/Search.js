import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [searchedVideos, setSearchedVideo] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      navigate(`/search/${searchedVideos}`);
      setSearchedVideo("");
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
      <button className={styles.button} type="submit" aria-label="search">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
