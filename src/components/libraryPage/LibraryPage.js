import React from "react";
import History from "./history/History";
import LoggedUserPlaylists from "./playlists/LoggedUserPlaylists";
import LikedVideos from "./Liked/LikedVideos";

const LibraryPage = () => {

    return (
        <div>
            <History />
            <LoggedUserPlaylists />
            <LikedVideos />
        </div>

    )
}

export default LibraryPage;