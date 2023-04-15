import { useState } from 'react';
import styles from './CommentInput.module.scss';
import commentsManager from '../../../models/CommentsManager';

function CommentInput({ videoID }) {
    const [commentText, setCommentText] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allComments = JSON.parse(localStorage.getItem('AllComments') || "[]");
    const commentID = videoID + "com" + allComments.length;

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentClear = () => {
        setCommentText('');
    };

    const handleCommentSubmit = () => {
        commentsManager.createComment(videoID, commentID, loggedUser.username, commentText)
        setCommentText('');
    };

    return (
        <div className={styles.commentInput}>
            <textarea
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
            />
            {commentText && (
                <div className={styles.buttons}>
                    <button onClick={handleCommentClear} disabled={!commentText}>
                        Clear
                    </button>
                    <button onClick={handleCommentSubmit}>Comment</button>
                </div>
            )}
        </div>
    );
}

export default CommentInput;

