import React, { useState } from "react";
import styles from "./Sidebar.module.scss";

import { Link } from "react-router-dom";
import homeLogo from "../../img/HomeLogo.png";
import shortsLogo from "../../img/ShortsLogo.png";
import libraryLogo from "../../img/LibraryLogo.webp";

function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const handleClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.linkList}>
        <Link to="/">
          <li
            style={{ paddingLeft: "20px",
            //  paddingRight: "40px" 
            }}
            className={`${styles.linkItem} ${
              activeLink === 0 ? styles.active : ""
            }`}
            onClick={() => handleClick(0)}
          >
            <img src={homeLogo} alt="home Logo" height={35} />
            Home
          </li>
        </Link>
        <Link to="/shorts">
          <li
            className={`${styles.linkItem} ${
              activeLink === 1 ? styles.active : ""
            }`}
            onClick={() => handleClick(1)}
          >
            {" "}
            <img
              src={shortsLogo}
              alt="shorts Logo"
              height={35}
              style={{ paddingLeft: "10px" }}
            />
            Shorts
          </li>
        </Link>
        <Link to={loggedUser ? "/library" : "/login"}>
          <li
            className={`${styles.linkItem} ${
              activeLink === 2 ? styles.active : ""
            }`}
            onClick={() => handleClick(2)}
          >
            {" "}
            <img
              src={libraryLogo}
              alt="library Logo"
              height={35}
              style={{ paddingLeft: "10px" }}
            />
            Library
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
