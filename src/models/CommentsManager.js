class Comment {
  constructor(videoID, commentID, username, text, usersActivity = []) {
    this.videoID = videoID;
    this.commentID = commentID;

    this.username = username;
    this.text = text;
    this.usersActivity = usersActivity;
  }
}

class CommentsManager {
  constructor() {
    if (!localStorage.getItem("allComments")) {
      localStorage.setItem("allComments", JSON.stringify(this.allComments));
    } else {
      this.allComments = JSON.parse(localStorage.getItem("allComments"));
    }
  }
  allComments = [];

  createComment = (videoID, commentID, username, text) => {
    this.allComments.unshift(new Comment(videoID, commentID, username, text));
    localStorage.setItem("allComments", JSON.stringify(this.allComments));
  };
}
