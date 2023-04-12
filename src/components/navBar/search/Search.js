import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchVideos from "../../homePage/searchedVideos/SearchedVideos"
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <form className={styles.form} onSubmit={onhandleSubmit}>
      <input
        className={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} type="submit" aria-label="search">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
