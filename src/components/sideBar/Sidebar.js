import React from "react";
import styles from "./Sidebar.module.scss";

import { Link } from "react-router-dom";
import homeLogo from "../../img/HomeLogo.png";
import shortsLogo from "../../img/ShortsLogo.png";
import libraryLogo from "../../img/LibraryLogo.webp";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.linkList}>
        <li className={styles.linkItem}>
          <Link to="/">
            <img src={homeLogo} alt="home Logo" height={45} />
            Home
          </Link>
        </li>
        <li className={styles.linkItem}>
          <Link to="/">
            {" "}
            <img src={shortsLogo} alt="shorts Logo" height={45} />
            Shorts
          </Link>
        </li>
        <li className={styles.linkItem}>
          <Link to="/library">
            {" "}
            <img src={libraryLogo} alt="library Logo" height={45} />
            Library
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
