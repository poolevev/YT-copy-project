class HistoryItem {
  constructor(videoID, username, isLiked=null) {
    this.videoID = videoID;
    this.username = username;
    this.isLiked = isLiked;
  }
}

class HistoryManager {
  constructor() {
    if (!localStorage.getItem("allHistory")) {
      localStorage.setItem("allHistory", JSON.stringify(this.allHistory));
    } else {
      this.allHistory = JSON.parse(localStorage.getItem("allHistory"));
    }
  }
  allHistory = [];


createHistoryItem = (videoID, username) => {
  //let alreadyViewedVideoObject = this.allHistory.find(videoHistory => videoHistory.videoID === videoID && videoHistory.username === username) 
  let alreadyViewedVideoIndex = this.allHistory.findIndex(videoHistory => videoHistory.videoID === videoID && videoHistory.username === username) 

if (alreadyViewedVideoIndex > -1){
//let isLiked = alreadyViewedVideoObject.isLiked
  this.allHistory.splice (alreadyViewedVideoIndex, 1)

  this.allHistory.unshift(new HistoryItem(videoID, username));
  localStorage.setItem("allHistory", JSON.stringify(this.allHistory));

}else{
  this.allHistory.unshift(new HistoryItem(videoID, username));
  localStorage.setItem("allHistory", JSON.stringify(this.allHistory));
}


}

}

let historyManager = new HistoryManager()