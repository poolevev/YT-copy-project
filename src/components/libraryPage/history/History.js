import React, { useState, useEffect } from 'react';
import LibraryVideoCard from "../LibraryVideoCard";
import styles from './History.module.scss';

const History = () => {
  const [history, setHistory] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
  const allHistory = JSON.parse(localStorage.getItem('AllHistory') || "[]");
  const userHistory = allHistory.filter(viewedVideo => viewedVideo.username === loggedUser?.username);
  const [showMore, setShowMore] = useState(userHistory.length > 3);

  useEffect(() => {
    if (userHistory.length) {
      setHistory(userHistory.slice(0, 3));
    }
  }, []);

  const loadMore = () => {
    const newLength = history.length + 3;
    const newHistory = userHistory.slice(0, newLength);
    setHistory(newHistory);

    if (newHistory.length >= userHistory.length) {
      setShowMore(false);
    }

  }

  return (
    <div>
      <h3 className={styles.categoryTitle} >History</h3>
      {history.length > 0 ? (
        <div>
          <div className={styles.container}>
            {history.map(item => (
              <div key={item.videoID}>
                {item.videoID && <LibraryVideoCard video={item} />}
              </div>
            ))}
          </div>
          {showMore && (
            <button className = {styles.showMoreBtn}  onClick={loadMore}>Show More</button>
          )}
        </div>
      ) : (
        <span>No history yet</span>
      )}
    </div>
  );
}

export default History;