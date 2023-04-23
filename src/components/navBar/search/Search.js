import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";
import { BsMic, BsXLg, BsSearch } from "react-icons/bs"


const SearchBar = () => {
  const [searchedVideos, setSearchedVideo] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      navigate(`/search/${searchedVideos}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchedVideos) {
        navigate(`/search/${searchedVideos}`);
        inputRef.current.blur();
      }
    }
    if (event.key === 'Backspace') {
      if (searchedVideos.length === 1) {
        setSearchedVideo("")
      }
      setShowClearIcon(false)
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    if (searchedVideos) {
      setSearchedVideo("")
      setShowClearIcon(false)
    } else {
      setShowClearIcon(false)
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true)
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
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setSearchedVideo(e.target.value);
          setShowClearIcon(true);
        }}
        ref={inputRef}
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