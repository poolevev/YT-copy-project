import React from 'react';
import styles from './SingleComment.module.scss';

const SingleComment = (comment) => (

    <div className={styles.card}>
        {console.log(comment)}
        <h3>This is a Comment</h3>

    </div>
);

export default SingleComment;