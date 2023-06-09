import { Link } from "react-router-dom";

import SearchBar from "./search/Search";
import styles from "./Navigation.module.scss";
import ProfilePic from "./profilePic/ProfilePic";
import logo from "../../img/logo.png";
import LogoStyles from "../navBar/Logo.module.scss";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/profileSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  loggedUser && dispatch(updateUser(loggedUser));

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="xxx Logo" height={35} className={LogoStyles.logo} />

          <h4>YouTude</h4>
        </Link>
      </div>
      <SearchBar />
      <ProfilePic />
    </div>
  );
};

export default Navigation;
