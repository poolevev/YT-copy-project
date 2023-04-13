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
          <img src={homeLogo} alt="home Logo" height={45} />
          <Link to="/">Home</Link>
        </li>
        <li className={styles.linkItem}>
          <img src={shortsLogo} alt="shorts Logo" height={45} />
          <Link to="/">Shorts</Link>
        </li>
        <li className={styles.linkItem}>
          <img src={libraryLogo} alt="library Logo" height={45} />
          <Link to="/library">Library</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
