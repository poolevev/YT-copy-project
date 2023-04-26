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

  allPlaylists = [];

  createPlaylist = (username, playlistID, playlistName, videos = []) => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

    if (loggedUser) {
      this.allPlaylists.push(new Playlist(username, playlistID, playlistName, videos));
      localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
    }
  };

  deletePlaylist = (username, playlistID) => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    let isDeletionAvailable = loggedUser.username === username;
    if (isDeletionAvailable) {
      let playlistIndex = this.allPlaylists.findIndex((playlistItem) => playlistItem.playlistID === playlistID);
      this.allPlaylists.splice(playlistIndex, 1);
      localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
    }
  };

  addVideoToPlaylist = (playlistID, videoID) => {
    let currentPlaylist = this.allPlaylists.find((playlist) => playlist.playlistID === playlistID);
    let currentPlaylistIndex = this.allPlaylists.findIndex((playlist) => playlist.playlistID === playlistID);
    if (!currentPlaylist.videos.includes(videoID)) {
      currentPlaylist.videos.push(videoID);
      this.allPlaylists.splice(currentPlaylistIndex, 1, currentPlaylist);
      localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
    }
  };

  removeVideoFromPlaylist = (playlistID, videoID) => {
    let currentPlaylist = this.allPlaylists.find((playlist) => playlist.playlistID === playlistID);
    let currentPlaylistIndex = this.allPlaylists.findIndex((playlist) => playlist.playlistID === playlistID);
    let currentVideoIdIndex = currentPlaylist.videos.findIndex((videoId) => videoId === videoID);
    currentPlaylist.videos.splice(currentVideoIdIndex, 1);
    this.allPlaylists.splice(currentPlaylistIndex, 1, currentPlaylist);
    localStorage.setItem("AllPlaylists", JSON.stringify(this.allPlaylists));
  };
}
const playlistsManager = new PlaylistsManager();

export default playlistsManager;
