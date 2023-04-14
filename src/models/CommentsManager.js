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
    if (!localStorage.getItem("AllComments")) {
      localStorage.setItem("AllComments", JSON.stringify(this.allComments));
    } else {
      this.allComments = JSON.parse(localStorage.getItem("AllComments"));
    }
  }
  allComments = [];

  createComment = (videoID, commentID, username, text) => {
    this.allComments.unshift(new Comment(videoID, commentID, username, text));
    localStorage.setItem("AllComments", JSON.stringify(this.allComments));
  };
}

const commentsManager = new CommentsManager();

export default commentsManager;
