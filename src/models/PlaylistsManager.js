export class Playlist {
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
            console.log("Playlist created")
        }

    }

    deletePlaylist = (username, playlistID) => {
        let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
        let isDeletionAvailable = loggedUser.username === username;
        if (isDeletionAvailable) {
            let playlistIndex = this.allPlaylists.findIndex(playlistItem => playlistItem.playlistID === playlistID)
            this.allPlaylists.splice(playlistIndex, 1);
            localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
            console.log("Playlist deleted")
        }


    }

    addVideoToPlaylist = (playlistID, videoID) => {
        let currentPlaylist = this.allPlaylists.find(playlist => playlist.playlistID === playlistID);
        let currentPlaylistIndex = this.allPlaylists.findIndex(playlist => playlist.playlistID === playlistID);
        if (!currentPlaylist.videos.includes(videoID)) {
            currentPlaylist.videos.push(videoID);
            this.allPlaylists.splice(currentPlaylistIndex, 1, currentPlaylist);
            localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
            console.log("added to playlist", `${playlistID}`)
        }
    }

    removeVideoFromPlaylist = (playlistID, videoID) => {
        let currentPlaylist = this.allPlaylists.find(playlist => playlist.playlistID === playlistID);
        let currentPlaylistIndex = this.allPlaylists.findIndex(playlist => playlist.playlistID === playlistID);
        let currentVideoIdIndex = currentPlaylist.videos.findIndex(videoId => videoId === videoID);
        console.log(currentPlaylist);
        currentPlaylist.videos.splice(currentVideoIdIndex, 1);
        this.allPlaylists.splice(currentPlaylistIndex, 1, currentPlaylist);
        localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
        console.log("removed from the playlist", `${playlistID}`)

    }

}
const playlistsManager = new PlaylistsManager();

export default playlistsManager;