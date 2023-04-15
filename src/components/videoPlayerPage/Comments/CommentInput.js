import { useState } from 'react';
import styles from './CommentInput.module.scss';
import commentsManager from '../../../models/CommentsManager';
import { v4 as uuid } from 'uuid';

function CommentInput({ videoID, addNewComments }) {
    const [commentText, setCommentText] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    let commentID = uuid();

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentClear = () => {
        setCommentText('');
    };

    const handleCommentSubmit = () => {
        commentsManager.createComment(videoID, commentID, loggedUser.username, commentText);
        const allComments = JSON.parse(localStorage.getItem('AllComments') || "[]");
        const currentVideoComments = allComments.filter(comment => comment.videoID === videoID);
        addNewComments(currentVideoComments);
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

