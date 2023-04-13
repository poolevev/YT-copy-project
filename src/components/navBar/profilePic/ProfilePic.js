import React from "react";
import { Link } from "react-router-dom";
const ProfilePic = () => {
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  return <div>
    {loggedUser ? <Link to="/library">Hello {loggedUser.username}</Link>
      : <Link to="/login">Login</Link>
    }
  </div>;
};


export default ProfilePic