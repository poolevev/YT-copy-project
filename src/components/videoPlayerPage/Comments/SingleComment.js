import React, { useState } from 'react';
import styles from './SingleComment.module.scss';
import commentsManager from '../../../models/CommentsManager';

const SingleComment = ({ comment }) => {

    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    const alreadyReacted = comment.usersReactions?.find(reactionObj => reactionObj.username === loggedUser?.username)
    const [isLikeClicked, setIsLikeClicked] = useState(alreadyReacted?.reaction === "Like" ? true : false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(alreadyReacted?.reaction === "Dislike" ? true : false);
    const [likesNumber, setLikesNumber] = useState(comment.usersReactions?.filter(reactionObj => reactionObj.reaction === "Like").length)
    const isReactionPossible = (loggedUser && comment.username !== loggedUser?.username)


    function likeComment() {

        if (isReactionPossible) {
            if (isLikeClicked) {

                commentsManager.removeReaction(loggedUser.username, "Like", comment.commentID);
                setLikesNumber((prev) => prev - 1);
                console.log("not Liked");

            } else {

                commentsManager.addReaction(loggedUser.username, "Like", comment.commentID);
                setLikesNumber((prev) => prev + 1);
                console.log("Liked");

            }

            setIsLikeClicked(!isLikeClicked);
            setIsDislikeClicked(false);
        }
    }

    function dislikeComment() {
        if (isReactionPossible) {
            if (isDislikeClicked) {
                commentsManager.removeReaction(loggedUser.username, "Dislike", comment.commentID);
                console.log("not disLiked");
            } else if (isLikeClicked) {
                commentsManager.addReaction(loggedUser.username, "Dislike", comment.commentID);
                setLikesNumber((prev) => prev - 1);
                console.log("disLiked")
            } else {
                commentsManager.addReaction(loggedUser.username, "Dislike", comment.commentID);
                console.log("disLiked")
            }

            setIsDislikeClicked(!isDislikeClicked);
            setIsLikeClicked(false)
        }
    }

    return (
        <div className={styles.card}>

            <h3>{comment.username}</h3>
            <p>{comment.text}</p>

            <button className={`${styles.button} ${isLikeClicked ? styles.clicked : styles.notClicked}`} onClick={likeComment}>&#x1F44D;{likesNumber}</button>
            <button className={`${styles.button} ${isDislikeClicked ? styles.clicked : styles.notClicked}`} onClick={dislikeComment}>&#x1F44E;</button>

        </div>
    )
};

export default SingleComment;