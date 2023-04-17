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
        <li style={{paddingLeft: "20px"}}
          className={`${styles.linkItem} ${activeLink === 0 ? styles.active : ""
            }`}
          onClick={() => handleClick(0)}
        >
          <Link to="/" >
            <img src={homeLogo} alt="home Logo" height={45} />
            Home
          </Link>
        </li>
        <li
          className={`${styles.linkItem} ${activeLink === 1 ? styles.active : ""
            }`}
          onClick={() => handleClick(1)}
        >
          <Link to="/shorts">
            {" "}
            <img src={shortsLogo} alt="shorts Logo" height={45} style={{paddingLeft: "10px"}} />

            Shorts
          </Link>
        </li>
        <li
          className={`${styles.linkItem} ${activeLink === 2 ? styles.active : ""
            }`}
          onClick={() => handleClick(2)}
        >
          <Link to={loggedUser ? "/library" : "/login"}>
            {" "}
            <img src={libraryLogo} alt="library Logo" height={45} style={{paddingLeft: "10px"}}/>
            Library
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;