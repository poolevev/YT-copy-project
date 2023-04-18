import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const ProfilePic = ({ loggedUser }) => {
  const isUserLoggedIn = useSelector((state) => state.profile.isLoggedIn);
  const profilePic = useSelector((state) => state.profile.profilePic);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isUserLoggedIn ? (
        <>
          <Image
            src={profilePic}
            alt="Profile"
            roundedCircle
            width={30}
            height={30}
            className="navBar_profilePic"
            style={{ marginRight: "10px" }}
          />
         <Link to="/profile">Hello, {loggedUser?.username}</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default ProfilePic;
