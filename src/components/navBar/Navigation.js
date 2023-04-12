import { Link } from "react-router-dom";
// import { logo } from "../utils/constants";
import SearchBar from "./search/Search";
import styles from "./Navigation.module.scss";
import ProfilePic from "./profilePic/ProfilePic";
const Navigation = () => (
  <div className={styles.navbar}>
    <div className={styles.logo}>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        {/* logo instead of null */}
        <img src={null} alt="logo" height={45} />
      </Link>
    </div>
    <SearchBar />
    <ProfilePic />
  </div>
);

export default Navigation;
