class Playlist {
    constructor(username, playlistID, playlistName, videos) {
        this.playlistID = playlistID;
        this.playlistName = playlistName;
        this.username = username;
        this.videos = videos;

    }
}

class PlaylistsManager {
    constructor() {
        if (!localStorage.getItem("AllPlaylists")) {
            localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
        } else {
            this.allPlaylists = JSON.parse(localStorage.getItem("AllPlaylists"));
        }
    }

    allPlaylists = [{ username: "user1", playlistID: "23723y", playlistName: "favorites", videos: [] }];

    createPlaylist = (username, playlistID, playlistName, videos = []) => {
        let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

        if (loggedUser) {

            this.allPlaylists.push(new Playlist(username, playlistID, playlistName, videos));
            localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
        }

    }

    addVideoToPlaylist = () => {

    }

    removeVideoFromPlaylist = () => {

    }

}
const playlistsManager = new PlaylistsManager();

export default playlistsManager;