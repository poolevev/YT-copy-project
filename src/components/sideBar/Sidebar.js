import React from "react";
import styles from "./Sidebar.module.scss";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.linkList}>
        <li className={styles.linkItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.linkItem}>
          <Link to="/">Shorts</Link>
        </li>
        <li className={styles.linkItem}>
          <Link to="/library">Library</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
