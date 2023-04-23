import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineAppRegistration } from 'react-icons/md';
import styles from "./ProfilePic.module.scss";

const ProfilePic = () => {
  const user = useSelector((state) => state.profile);
  const profilePic = useSelector((state) => state.profile.profilePic);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {user.isLoggedIn ? (
        <>
          <Image
            src={
              profilePic ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s"
            }
            alt="Profile"
            roundedCircle
            width={37}
            height={37}
            className="navBar_profilePic"
            style={{ marginRight: "10px" }}
          />
          <Link to="/profile">
          <Button className={styles.loginRegistrationNavbarButton}>
            {user?.nickname}
            </Button>
            </Link>
        </>
      ) : (
        <Link>
        <Link to="/login">
          <Button className={styles.loginRegistrationNavbarButton}><bi class="bi bi-person-circle"></bi> Login</Button>
        </Link>
        <span> </span>
        <Link to="/register">
          <Button className={styles.loginRegistrationNavbarButton}><MdOutlineAppRegistration /> Registration</Button>
        </Link>
      </Link>

        // <Link to="/register">Register</Link>
      )}
    </div>
  );
};

export default ProfilePic;
