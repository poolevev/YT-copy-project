import React, { useState } from 'react';
import styles from './SingleComment.module.scss';
import commentsManager from '../../../models/CommentsManager';
import { BiLike, BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const SingleComment = ({ comment }) => {

    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    const alreadyReacted = comment.usersReactions?.find(reactionObj => reactionObj.username === loggedUser?.username)
    const [isLikeClicked, setIsLikeClicked] = useState(alreadyReacted?.reaction === "Like" ? true : false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(alreadyReacted?.reaction === "Dislike" ? true : false);
    const [likesNumber, setLikesNumber] = useState(comment.usersReactions?.filter(reactionObj => reactionObj.reaction === "Like").length)
    const isReactionPossible = (loggedUser && comment.username !== loggedUser?.username);
    const profilePic = useSelector((state) => state.profile.profilePic);


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
            {console.log(loggedUser)}
            <div className={styles.logoNicknameContainer}>
            <img className={styles.userLogo} alt="logo" scr={loggedUser.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s"}/>
            <h6>{comment.nickname}</h6>
            </div>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.buttonsContainer}>
                <button className={`${styles.button} ${isLikeClicked ? styles.clicked : styles.notClicked}`} onClick={likeComment}><BiLike />  {likesNumber}</button>
                <button className={`${styles.button} ${isDislikeClicked ? styles.clicked : styles.notClicked}`} onClick={dislikeComment}><BiDislike /></button>
            </div>
        </div>
    )
};

export default SingleComment;