import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
  const allHistory = JSON.parse(localStorage.getItem('AllHistory') || "[]");
  const userHistory = allHistory.filter(viewedVideo => viewedVideo.username === loggedUser.username);

  useEffect(() => {

    if (allHistory.length) {

      setHistory(userHistory);
    }
  }, []);

  const loadMore = () => {
    const newLength = history.length + 3;

    if (allHistory) {
      const newHistory = userHistory.slice(0, newLength);
      setHistory(newHistory);

      if (newHistory.length >= userHistory.length) {
        setShowMore(false);
      }
    }
  }

  return (
    <div>
      <h2>History</h2>
      {history.length > 0 ? (
        <div>
          {history.map((item, index) => (
            <div className="card" key={index}>
              Card{index}
            </div>
          ))}
          {showMore && (
            <button onClick={loadMore}>Show More</button>
          )}
        </div>
      ) : (
        <span>No history yet</span>
      )}
    </div>
  );
}

export default History;