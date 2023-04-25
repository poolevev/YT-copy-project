import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";
import { BsMic, BsXLg, BsSearch } from "react-icons/bs";
import { debounce } from "../../../utils/debounce";

const SearchBar = () => {
  const [searchedVideos, setSearchedVideo] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearchSuggestion = (suggestion) => {
    setSearchedVideo(suggestion);
    setSearchSuggestions([]);
    navigate(`/search/${suggestion}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedVideos) {
      navigate(`/search/${searchedVideos}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchedVideos) {
        navigate(`/search/${searchedVideos}`);
        inputRef.current.blur();
      }
    }
    if (event.key === "Backspace") {
      if (searchedVideos.length === 1) {
        setSearchedVideo("");
        setSearchSuggestions([]);
      }
      setShowClearIcon(false);
    }
  };

  const handleClear = (event) => {
    debounce(console.log("iz cleara"), 5000);
    event.preventDefault();
    if (searchedVideos) {
      setSearchedVideo("");
      setSearchSuggestions([]);
      setShowClearIcon(false);
    } else {
      setShowClearIcon(false);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchedVideo(transcript);
      navigate(`/search/${transcript}`);
    };
    recognition.onstart = () => {
      setIsListening(true);
      document.querySelector("input").setAttribute("placeholder", "Speak now! English only!");
    };
    recognition.onend = () => {
      setIsListening(false);
      document.querySelector("input").setAttribute("placeholder", "Search...");
    };
    recognition.start();
  };
  // keys "AIzaSyBl33jUdCXd1qPVXd7gKaz5H2RNW8Bqegs" //'AIzaSyCtiszcgPf6MsKzfjOIAj98Y6-i6e9R2Bw';
  const searchSuggestionsCallback = (e) => {
    const query = e.target.value;
    const apiKey = "AIzaSyBl33jUdCXd1qPVXd7gKaz5H2RNW8Bqegs";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${query}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const suggestions = data.items.map((item) => item.snippet.title);
        setSearchSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error fetching search suggestions:", error);
      });
  };

  const handleInputChange = (event) => {
    setSearchedVideo(event.target.value);
    setShowClearIcon(true);
    //debounce(searchSuggestionsCallback(event), 500)
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder={isListening ? "Speak now! English only!" : "Search..."}
          value={searchedVideos}
          onKeyDown={handleKeyDown}
          onInput={handleInputChange}
          ref={inputRef}
        />
        {showClearIcon && (
          <button onClick={handleClear} className={styles.buttonClear} aria-label="search">
            <BsXLg />
          </button>
        )}
        <button onClick={handleVoiceSearch} className={`${styles.buttonMic} ${isListening ? styles.listening : ""}`} aria-label="search">
          <BsMic />
        </button>

        <button className={styles.buttonSrc} type="submit" aria-label="search">
          <BsSearch />
        </button>
      </form>
      {searchSuggestions.length > 0 && (
        <ul className={styles.autocomplete}>
          {searchSuggestions.map((result) => (
            <li
              key={result}
              onClick={() => {
                handleSearchSuggestion(result.length > 60 ? `${result.slice(0, 30)}...` : result);
              }}
            >
              <BsSearch className={styles.itemSearchIcon} /> {result.length > 60 ? `${result.slice(0, 60)}...` : result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
