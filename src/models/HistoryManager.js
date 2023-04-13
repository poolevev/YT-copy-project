class HistoryItem {
  constructor(videoID, username, isLiked) {
    this.videoID = videoID;
    this.username = username;
    this.isLiked = isLiked;
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

  createHistoryItem = (videoID, username, isLiked = null) => {
    let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

    if (loggedUser) {
      let alreadyViewedVideoIndex = this.allHistory.findIndex(videoHistory => videoHistory.videoID === videoID && videoHistory.username === username.username)

      if (alreadyViewedVideoIndex > -1) {
        console.log("already")
        this.allHistory.splice(alreadyViewedVideoIndex, 1);//remove previos similar history
        this.allHistory.unshift(new HistoryItem(videoID, username.username, isLiked));
        localStorage.setItem("AllHistory", JSON.stringify(this.allHistory));

      } else {

        this.allHistory.unshift(new HistoryItem(videoID, username.username, isLiked));
        localStorage.setItem("AllHistory", JSON.stringify(this.allHistory));
      }

    }
  }

}
const historyManager = new HistoryManager();

export default historyManager