import React, { useState } from 'react';
import styles from './SingleComment.module.scss';
import commentsManager from '../../../models/CommentsManager';
import { AiOutlineLike, AiOutlineDislike, AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getTimeDifference } from '../../../utils/getTimeDifference';

const SingleComment = ({ comment }) => {

    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    const alreadyReacted = comment.usersReactions?.find(reactionObj => reactionObj.username === loggedUser?.username)
    const [isLikeClicked, setIsLikeClicked] = useState(alreadyReacted?.reaction === "Like" ? true : false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(alreadyReacted?.reaction === "Dislike" ? true : false);
    const [likesNumber, setLikesNumber] = useState(comment.usersReactions?.filter(reactionObj => reactionObj.reaction === "Like").length)
    const isReactionPossible = (loggedUser && comment.username !== loggedUser?.username);
    const profilePic = useSelector((state) => state.profile.profilePic);
    const formattedDate = getTimeDifference(comment.creationTime);


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
        <div className={styles.singleCommentCard}>
            <div style={{ minWidth: "60px" }}>
                <img className={styles.userLogo} alt="logo" scr={loggedUser.image || "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"} />
            </div>
            <div className={styles.commentPart} style={{ wordWrap: "break-word" }}>
                <b>{comment.nickname}</b><small style={{ color: "gray" }}>  {formattedDate} ago</small>
                <p className={styles.commentText}>{comment.text}</p>
                <div className={styles.buttonsContainer}>
                    <button className={styles.commentLikeBtn} onClick={likeComment}>{!isLikeClicked ? <AiOutlineLike /> : <AiTwotoneLike />}  {likesNumber}</button>
                    <button className={styles.commentDislikeBtn} onClick={dislikeComment}>{!isDislikeClicked ? <AiOutlineDislike /> : <AiTwotoneDislike />}</button>
                </div>
            </div>

        </div>
    )
};

export default SingleComment;