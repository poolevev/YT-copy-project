import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";
import { BsMic, BsXLg, BsSearch } from "react-icons/bs"


const SearchBar = () => {
  const [searchedVideos, setSearchedVideo] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      navigate(`/search/${searchedVideos}`);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    if (searchedVideos) {
      setSearchedVideo("")
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchedVideo(transcript);
      navigate(`/search/${transcript}`);
    };
    recognition.onstart = () => {
      setIsListening(true);
      document.querySelector('input').setAttribute('placeholder', 'Speak now! English only!');
    };
    recognition.onend = () => {
      setIsListening(false);
      document.querySelector('input').setAttribute('placeholder', 'Search...');
    };
    recognition.start();
  };
  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
    <input
  className={styles.input}
  placeholder={isListening ? "Speak now! English only!" : "Search..."}
  value={searchedVideos}
  onChange={(e) => {
    setSearchedVideo(e.target.value);
    setShowClearIcon(true);
  }}
/>
      {showClearIcon && <button onClick={handleClear} className={styles.buttonClear} aria-label="search">
        <BsXLg />
      </button>}
      <button onClick={handleVoiceSearch} className={`${styles.buttonMic} ${isListening ? styles.listening : ""}`} aria-label="search">
  <BsMic />
</button>

      <button className={styles.buttonSrc} type="submit" aria-label="search">
        <BsSearch />
      </button>
    </form>
  );
};

export default SearchBar;