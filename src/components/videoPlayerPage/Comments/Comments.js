import React, { useState, useEffect } from "react";
import styles from "./Comments.module.scss";
import SingleComment from "./SingleComment";
import CommentInput from "./CommentInput";
import { useParams } from "react-router-dom";

const Comments = ({ videoID }) => {
  const [comments, setComments] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allComments = JSON.parse(localStorage.getItem("AllComments") || "[]");
  const currentComments = allComments.filter((comment) => comment.videoID === videoID);
  const [showMore, setShowMore] = useState(currentComments.length > 3);
  const { id } = useParams();

  useEffect(() => {
    if (currentComments.length) {
      setComments(currentComments.slice(0, 3));
    } else {
      setComments([]);
    }
  }, [id]);

  const loadMore = () => {
    const newLength = comments.length + 3;
    const newComments = currentComments.slice(0, newLength);
    setComments(newComments);

    if (newComments.length >= currentComments.length) {
      setShowMore(false);
    }
  };

  return (
    <div>
      <h6 className={styles.title}> {currentComments.length} Comments</h6>

      {loggedUser ? <CommentInput videoID={videoID} addNewComments={setComments} /> : null}

      {comments.length > 0 ? (
        <div>
          <div className={styles.container}>
            {comments.map((item) => (
              <div key={item.commentID}>{item.commentID && <SingleComment comment={item} />}</div>
            ))}
          </div>
          {showMore && (
            <button style={{ borderRadius: "20px" }} onClick={loadMore}>
              Show More
            </button>
          )}
        </div>
      ) : (
        <span>No comments yet</span>
      )}
    </div>
  );
};

export default Comments;
