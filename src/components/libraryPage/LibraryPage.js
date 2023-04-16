import React from "react";
import History from "./history/History";
import Playlists from "./playlists/Playlists";
import LikedVideos from "./Liked/LikedVideos";

const LibraryPage = () => {

    return (
        <div>
            <History />
            <Playlists />
            <LikedVideos />
        </div>

    )
}

export default LibraryPage;