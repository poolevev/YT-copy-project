import React, { useState, useEffect } from 'react';
import styles from './Comments.module.scss';
import SingleComment from "./SingleComment";
import CommentInput from "./CommentInput";

const Comments = ({ videoID }) => {

    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allComments = JSON.parse(localStorage.getItem('AllComments') || "[]");
    const videoComments = allComments.filter(comment => comment.videoID === videoID);

    useEffect(() => {

        if (allComments.length) {

            setComments(videoComments);
        }
    }, []);

    const loadMore = () => {
        const newLength = comments.length + 3;

        if (allComments) {
            const moreComments = videoComments.slice(0, newLength);
            setComments(moreComments);

            if (moreComments.length >= videoComments.length) {
                setShowMore(false);
            }
        }
    }


    return (
        <div>
            <h2> {comments.length} Commentaries</h2>

            {loggedUser ? <CommentInput videoID={videoID} /> : null}

            {comments.length > 0 ? (
                <div>
                    <div className={styles.container}>
                        {comments.map(item => (
                            <div key={item.videoID}>
                                {item.videoID && <SingleComment comment={item} />}
                            </div>
                        ))}
                    </div>
                    {showMore && (
                        <button onClick={loadMore}>Show More</button>
                    )}
                </div>
            ) : (
                <span>No comments yet</span>
            )}
        </div>
    );

}

export default Comments;