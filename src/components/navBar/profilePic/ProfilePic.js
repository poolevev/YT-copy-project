import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const ProfilePic = () => {
  const user = useSelector((state) => state.profile);
  const profilePic = useSelector((state) => state.profile.profilePic);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {user.isLoggedIn ? (
        <>
          <Image
            src={profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s"}
            alt="Profile"
            roundedCircle
            width={30}
            height={30}
            className="navBar_profilePic"
            style={{ marginRight: "10px" }}
          />
         <Link to="/profile">Hello, {user?.nickname}</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default ProfilePic;
