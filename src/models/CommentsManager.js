class Comment {
  constructor(videoID, commentID, username, nickname, text, usersReactions = []) {
    this.videoID = videoID;
    this.commentID = commentID;
    this.username = username;
    this.nickname = nickname;
    this.text = text;
    this.usersReactions = usersReactions;
    this.creationTime = new Date();
  }
}

class Reaction {
  constructor(username, reaction) {
    this.username = username;
    this.reaction = reaction;
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

  createComment = (videoID, commentID, username, nickname, text) => {
    this.allComments.unshift(new Comment(videoID, commentID, username, nickname, text));
    localStorage.setItem("AllComments", JSON.stringify(this.allComments));
  };

  addReaction = (username, reaction, commentID) => {
    console.log(this.allComments);
    let currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
    let currentComment = this.allComments.find((comment) => comment.commentID === commentID);
    let currentCommentIndex = this.allComments.findIndex((comment) => comment.commentID === commentID);
    let previousReactionObjIndex = currentComment.usersReactions.findIndex((reactionObj) => reactionObj.username === username);
    console.log(previousReactionObjIndex);
    if (currentUser?.username !== currentComment.username) {
      if (previousReactionObjIndex > -1) {
        currentComment.usersReactions.splice(previousReactionObjIndex, 1);
        console.log("previous reaction removed");
      }
      currentComment.usersReactions.push(new Reaction(username, reaction));
      this.allComments.splice(currentCommentIndex, 1, currentComment);
      localStorage.setItem("AllComments", JSON.stringify(this.allComments));
      console.log("added reaction");
    }
  };

  removeReaction = (username, commentID) => {
    let allComments = JSON.parse(localStorage.getItem("AllComments"));
    let currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
    let currentComment = allComments.find((comment) => comment.commentID === commentID);
    let currentCommentIndex = allComments.findIndex((comment) => comment.commentID === commentID);
    let previousReactionObjIndex = currentComment?.usersReactions.findIndex((reactionObj) => reactionObj.username === username);
    console.log(currentComment, previousReactionObjIndex);
    if (currentUser?.username !== currentComment?.username) {
      if (previousReactionObjIndex > -1) {
        currentComment?.usersReactions.splice(previousReactionObjIndex, 1);
        allComments.splice(currentCommentIndex, 1, currentComment);
        localStorage.setItem("AllComments", JSON.stringify(allComments));
        console.log("remove reaction");
      }
    }
  };

  updateNickname = (oldNickname, newNickname) => {
    this.allComments.forEach((comment) => {
      if (comment.nickname === oldNickname) {
        comment.nickname = newNickname;
      }
    });
    localStorage.setItem("AllComments", JSON.stringify(this.allComments));
  };
}

const commentsManager = new CommentsManager();

export default commentsManager;
