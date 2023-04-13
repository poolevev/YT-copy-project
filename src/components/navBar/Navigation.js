import { Link } from "react-router-dom";

// import { logo } from "../utils/constants";
import SearchBar from "./search/Search";
import styles from "./Navigation.module.scss";
import ProfilePic from "./profilePic/ProfilePic";
import logo from "../../img/logo.png";
import LogoStyles from "../navBar/Logo.module.scss"; // Import the SCSS file
const Navigation = () => (
  <div className={styles.navbar}>
    <div className={styles.logo}>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}></Link>
      <img
        src={logo}
        alt="xxx Logo"
        height={45}
        className={LogoStyles.logo}
      />{" "}
    </div>
    <SearchBar />
    <ProfilePic />
  </div>
);

export default Navigation;
