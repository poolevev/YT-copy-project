import React from "react";
const Profile = () => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    return <div>
        <h2>Profile</h2>

        username : {loggedUser.username}
    </div>;
};


export default Profile