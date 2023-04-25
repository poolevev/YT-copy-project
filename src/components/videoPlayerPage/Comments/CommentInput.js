import { useState } from 'react';
import styles from './CommentInput.module.scss';
import commentsManager from '../../../models/CommentsManager';
import { v4 as uuid } from 'uuid';
import ToastAlert from '../../UI/ToastAlert';

function CommentInput({ videoID, addNewComments }) {
    const allUsers = JSON.parse(localStorage.getItem("AllUsers"));
    const [commentText, setCommentText] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    let commentID = uuid();
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const handleCommentChange = (event) => {
        let text = event.target.value.trimStart();
        if (text.length > 0) {
            setCommentText(text);
        } else {
            setCommentText('');
        }
    };

    const handleCommentClear = () => {
        setCommentText('');
    };

    const handleCommentSubmit = () => {
        commentsManager.createComment(videoID, commentID, loggedUser.username, loggedUser.nickname, commentText.trimEnd());
        const allComments = JSON.parse(localStorage.getItem('AllComments') || "[]");
        const currentVideoComments = allComments.filter(comment => comment.videoID === videoID);
        addNewComments(currentVideoComments);
        setCommentText('');
        setShowToast(true);
        setToastText("The comment has been added")
    };

    return (
        <div className={styles.commentInput}>
            <div className={styles.logoPart}>
                <img
                    className={styles.userLogo}
                    alt="logo"
                    src={
                        allUsers.find((user) => user.username === loggedUser.username)
                            ?.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s"
                    }
                />
            </div>
            <div className={styles.textPart}>
                <ToastAlert className={styles.alertToast} show={showToast} close={() => setShowToast(false)} text={toastText} />
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

                <hr className={styles.hrLine}></hr>
            </div>
        </div>
    );
}

export default CommentInput;

