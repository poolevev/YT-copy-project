
class Comment {
  constructor(videoID, commentID, username, text, usersReactions = []) {
    this.videoID = videoID;
    this.commentID = commentID;
    this.username = username;
    this.text = text;
    this.usersReactions = usersReactions;
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
  currentUser = JSON.parse(localStorage.getItem("LoggedUser"));

  createComment = (videoID, commentID, username, text) => {
    this.allComments.unshift(new Comment(videoID, commentID, username, text));
    localStorage.setItem("AllComments", JSON.stringify(this.allComments));
  };

  addReaction = (username, reaction, commentID) => {
    console.log("start")
    console.log(this.allComments)
    let currentComment = (this.allComments.find(comment => comment.commentID = commentID));
    let previousReactionObjIndex = currentComment.usersReactions.findIndex(reactionObj => reactionObj.username === username);
    console.log(previousReactionObjIndex)
    if (this.currentUser?.username !== currentComment.username) {
      console.log("enter")
      if (previousReactionObjIndex > -1) {
        currentComment.usersReactions.splice(previousReactionObjIndex, 1);
        console.log("previous removed")
      }
      currentComment.usersReactions.push(new Reaction(username, reaction));
      localStorage.setItem("AllComments", JSON.stringify(this.allComments));
      console.log("add reaction")
    }
  }

  removeReaction = (username, reaction, commentID) => {
    console.log("start")
    console.log(this.allComments)
    let currentComment = (this.allComments.find(comment => comment.commentID = commentID));
    let previousReactionObjIndex = currentComment.usersReactions.findIndex(reactionObj => reactionObj.username === username);
    console.log(currentComment, previousReactionObjIndex)
    if (this.currentUser?.username !== currentComment.username) {
      console.log("enter")
      if (previousReactionObjIndex > -1) {
        currentComment.usersReactions.splice(previousReactionObjIndex, 1);
        localStorage.setItem("AllComments", JSON.stringify(this.allComments));
        console.log("remove reaction")
      }
    }
  }
}

const commentsManager = new CommentsManager();

export default commentsManager;
