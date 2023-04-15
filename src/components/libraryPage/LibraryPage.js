import React from "react";
import History from "./history/History";
import Playlists from "./playlists/Playlists";
import LikedVideos from "./Liked/LikedVideos";
// import Profile from "../profile/Profile";

const LibraryPage = () => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    return (
        <div>
            {/* {loggedUser ? <Profile /> : null} */}
            <History />
            <Playlists />
            <LikedVideos />
        </div>

    )
}

export default LibraryPage;