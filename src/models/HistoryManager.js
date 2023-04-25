class HistoryItem {
  constructor(videoID, username, snippet, isLiked) {
    this.videoID = videoID;
    this.username = username;
    this.snippet = snippet;
    this.isLiked = isLiked;
    this.viewedAt = new Date();
  }
}

class HistoryManager {
  constructor() {
    if (!localStorage.getItem("AllHistory")) {
      localStorage.setItem("AllHistory", JSON.stringify(this.allHistory));
    } else {
      this.allHistory = JSON.parse(localStorage.getItem("AllHistory"));
    }
  }

  allHistory = [];

  createHistoryItem = (videoID, username, snippet, isLiked = null) => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

    if (loggedUser) {
      let alreadyViewedVideoIndex = this.allHistory.findIndex(
        (videoHistory) => videoHistory.videoID === videoID && videoHistory.username === username.username
      );

      if (alreadyViewedVideoIndex > -1) {
        this.allHistory.splice(alreadyViewedVideoIndex, 1);
        this.allHistory.unshift(new HistoryItem(videoID, username.username, snippet, isLiked));
        localStorage.setItem("AllHistory", JSON.stringify(this.allHistory));
      } else {
        this.allHistory.unshift(new HistoryItem(videoID, username.username, snippet, isLiked));
        localStorage.setItem("AllHistory", JSON.stringify(this.allHistory));
      }
    }
  };
}
const historyManager = new HistoryManager();

export default historyManager;
