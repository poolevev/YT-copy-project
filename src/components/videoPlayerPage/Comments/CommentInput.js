import { useState } from 'react';
import styles from './CommentInput.module.scss';
import commentsManager from '../../../models/CommentsManager';

function CommentInput({ videoID }) {
    const [comment, setComment] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allComments = JSON.parse(localStorage.getItem('AllComments') || "[]");
    const commentID = videoID + "com" + allComments.length;

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentClear = () => {
        setComment('');
    };

    const handleCommentSubmit = () => {
        commentsManager.createComment(videoID, commentID, loggedUser.username, comment)
        setComment('');
    };

    return (
        <div className={styles.commentInput}>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
            />
            {comment && (
                <div className={styles.buttons}>
                    <button onClick={handleCommentClear} disabled={!comment}>
                        Clear
                    </button>
                    <button onClick={handleCommentSubmit}>Comment</button>
                </div>
            )}
        </div>
    );
}

export default CommentInput;

